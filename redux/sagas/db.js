import { put, takeEvery, all, select } from 'redux-saga/effects'
import { getDatabase } from '../selectors'

// DB
import Synchroniser from '../../db/synchroniser';
import { schema } from '../../db/schema';
import seedDatabase from '../../db/seeds';
import { syncWithDatabase } from '../../db/sync_with_server';

const axios = require('axios');
const url = 'https://warm-mesa-02274.herokuapp.com';

const log = (arg) => (__DEV__ && console.log(`sagas -> db -> ${arg}`))

function* initialiseDb() {
  log('initialiseDb')
  const db = new Synchroniser({
        database: "offlineDatabase.db",
        size: 200000,
        schema: schema
    },
    true);
  try {
    yield db.initDb()
    yield __DEV__ ? seedDatabase(db) : null;
    yield syncWithDatabase(db)
  } catch(e) {
    throw new Error(`sagas -> db -> initialiseDb: ${e}`)
  } finally {
    yield put({ type: 'CREATE_DB', payload: db })  
    yield getAllFromDb()
    yield getAllFromServer()
  }
}

function* tearDownDb() {
  log('tearDownDb')
  const db = yield select(getDatabase);
  yield (db.readState === 'ready') && db.close();
  yield put({ type: 'DESTROY_DB' });  
}

function* getAllFromDb() {
  log('getAllFromDb')
  const db = yield select(getDatabase);
  let clubs = [],
      invitations =[],
      proposals =[];
  
  try {
    // Clubs
    yield db.call.get({all: 'clubs'}).then( (r) => 
      r.map( (thing) => clubs.push(thing) )
    )
    // Proposals
    yield db.call.get({all: 'proposals'}).then( (r) => 
      r.map( (thing) => proposals.push(thing) )
    )
    // Invitations
    yield db.call.get({all: 'invitations'}).then( (r) => 
      r.map( (thing) => invitations.push(thing) )
    )
    yield put({ type: 'CLUB_CREATE', payload: clubs })
    yield put({ type: 'INVITATION_CREATE', payload: invitations })
    yield put({ type: 'PROPOSAL_CREATE', payload: proposals })
  } catch(e) {
    throw new Error(`sagas -> db -> getAllFromDb: ${e}`)
  }
}

function* getAllFromServer() {
  log('getAllFromServer')
  const db = yield select(getDatabase);
  let exchanges = [],
      indices = [],
      stocks = [];
  
  try {
    yield getExchanges().then((e) => {return exchanges = e})
    yield put({ type: 'EXCHANGE_CREATE', payload: exchanges })
    yield syncOneThingWithDatabase('exchanges', db, exchanges)
    yield getIndices().then((i) => {return indices = i})
    yield put({ type: 'INDEX_CREATE', payload: indices })
    yield syncOneThingWithDatabase('indices', db, indices)
    yield getStocks().then((s) => {return stocks = s})
    yield put({ type: 'STOCK_CREATE', payload: stocks })
    yield syncOneThingWithDatabase('stocks', db, stocks)
  } catch(e) {
    throw new Error(`sagas -> db -> getAllFromServer: IN PRODUCTION THIS SHOULD NOT BE AN ERROR - POOR CONNECTIVITY CAN LEAD TO FREQUENT FAILURE HERE ${e}`)
  }
}

// Watcher sagas
export function* watchInitialiseDb() {
  yield takeEvery('INITIALISE_DB', initialiseDb)
}

export function* watchGetAllFromDb() {
  yield takeEvery('GET_ALL_FROM_DB', getAllFromDb)
}

export function* watchGetAllFromServer() {
  yield takeEvery('GET_ALL_FROM_SERVER', getAllFromServer)
}

export function* watchTearDownDb() {
  yield takeEvery('TEAR_DOWN_DB', tearDownDb)
}

// Server get methods
const getExchanges = () => {
  return axios.get(`${url}/exchanges`)
    .then(result => {
      return result.data
    })
}

const getIndices = () => {
  return axios.get(`${url}/indices`)
    .then(result => {
      let returnVal = [];
      result.data.map((d) => {
        let ind = d.index;
        ind['stocks'] = d.stocks.map((s) => s.symbol)
        if(ind.symbol != 'UNK') {
          returnVal.push(ind)
        }
      })
      return returnVal
    })
}

const getStocks = () => {
  return axios.get(`${url}/stocks`)
    .then(result => {
      return result.data
    })
}

// Helper methods
const syncOneThingWithDatabase = async (things, db, thingsInStore) => {
  log(`syncWithDatabase: started database ${things} syncronisation`)
  const inDb = await db.call.get({all: things})
    .catch(error => {
      throw new Error(`\n\nsync_with_server -> syncWithDatabase -> synchroniser: ${error}\n`)
    }),
    differences = compareTwoThings(inDb,thingsInStore);
  // Create new stocks
  if(differences.create.length > 0){
    let obj = {};
    obj[things] = differences.create;
    try {
      db.call.create(obj)
    } catch(error) {
      throw new Error(`syncOneThingWithDatabase -> ${error}`)
    }
  }
  // Delete old
  if(differences.destroy.length > 0){
    differences.destroy.map((record) => {
      try {
        db.call.delete(things, record.id)
      } catch(error) {
        throw new Error(`syncOneThingWithDatabase -> ${error}`)
      }
    })
  }
  // Update existing
  if(differences.update.length > 0){
    differences.update.map((record) => {
      let obj = {};
      obj[things] = [{id: record.id, ...record.update}]
      try {
        db.call.update(obj)
      } catch(error) {
        throw new Error(`syncOneThingWithDatabase -> ${error}`)
      }
    })
  }
}

function compareTwoThings(a,b) {
  if(Array.isArray(a) && Array.isArray(b)) {
    return diffBetweenTwoArraysOfObjects(a,b)
  } else if((typeof a === 'object') && (typeof b === 'object') ) {
    return diffBetweenTwoObjects(a,b)
  } else {
    throw new Error('compareTwoThings: error with arguments, they are not the same type or not objects or arrays.')
  }
}

export function diffBetweenTwoArraysOfObjects(a,b) {
  /*
    Returns additions, updates and deletions neccesary for a to equal b
    Input:
      a: Array[Object]
      b: Array[Object]
    Output:
      {
        create: Array[Object],
        destroy: Array[Object],
        update: Array[Object]
      }
  */
  let result = {},
      inBothArrays,
      update;
  // In a but not b
  result.destroy = a.filter((obj) => {
    let id = obj.id;
    return b.every((b_element) => {return b_element.id !== obj.id})
  })
  // In b but not a
  result.create = b.filter((obj) => {
    let id = obj.id;
    return a.every((a_element) => {return a_element.id !== id})
  })
  // In both a and b
  inBothArrays = b.filter((obj) => {
    let id = obj.id;
    return a.some((a_element) => {return a_element.id === id})
  })
  update = inBothArrays.map((obj) => {
    let oldElement = a.filter((a_element) => {return a_element.id === obj.id})[0];
    let changes = diffBetweenTwoObjects(oldElement,obj);
    changes.id = obj.id;
    return changes
  })
  result.update = update.filter((el) => {
    return Object.keys(el).length > 1
  })
  return result;
}

const allArrayElementsAreSame = (a,b) => (!a.every((v) => b.includes(v)) || !a.every((v) => b.includes(v)))

export function diffBetweenTwoObjects(a,b) {
  /*
    Returns additions, updates and deletions neccesary for a to equal b
    Input:
      a: Object
      b: Object
    Output:
      {
        create: Object,
        destroy: Object,
        update: Object
      }
  */
  let result = {};
  for(prop in a) {
    if(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      // In both a and b
      if(a[prop] === '0' && b[prop] === null) {
        // Make sure zero and null are classified as equal
      } else if(Array.isArray(a[prop]) || Array.isArray(b[prop])) {
        // If values are arrays then convert any jsons back to an array and compare
        try {
          // Property of a is a json
          let arr = JSON.parse(a[prop]),
              chng = {};
          if(allArrayElementsAreSame(arr, b[prop])) {
            chng[prop] = b[prop];
            result.update = chng;
          }
        } catch(e) {
          try {
            // Property of b is a json
            let arr = JSON.parse(b[prop]),
                chng = {};
            if(allArrayElementsAreSame(arr, a[prop])) {
              chng[prop] = b[prop];
              result.update = chng;
            }
          } catch(e) {
            // Both a and b are arrays
            let chng = {};
            if(allArrayElementsAreSame(a[prop], b[prop])) {
              chng[prop] = b[prop];
              result.update = chng;
            }
          }
        }
      } else {
        if(a[prop] !== b[prop]) {
          let chng = {};
          chng[prop] = b[prop];
          result.update = chng;
        }  
      }
    } else if(a.hasOwnProperty(prop)) {
      // Just in a
      let chng = {};
      chng[prop] = a[prop];
      result.destroy = chng;
    }
  }
  for(prop in b) {
    if(b.hasOwnProperty(prop) && !a.hasOwnProperty(prop)) {
      // Just in b
      let chng = {};
      chng[prop] = b[prop];
      result.create = chng;
    }
  }
  return result;
}