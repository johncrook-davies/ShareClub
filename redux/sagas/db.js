import { put, takeEvery, all, select, call } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import { 
  getExchanges,
  getIndices,
  getStocks,
  getExchange,
  getStock,
  syncOneThingWithDatabase,
} from './helpers';

// DB
import Synchroniser from '../../db/synchroniser';
import { schema } from '../../db/schema';
import seedDatabase from '../../db/seeds';

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
    yield call([db,'initDb']);
    if(__DEV__){yield call(seedDatabase, db)};
    yield put({ type: 'CREATE_DB', payload: db })  
    yield call(getAllFromDb)
    yield call(getAllFromServer)
  } catch(e) {
    throw new Error(`sagas -> db -> initialiseDb: ${e}`)
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
      proposals = [],
      exchanges = [],
      indices = [],
      stocks = [];
  
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
    // Exchanges
    yield db.call.get({all: 'exchanges'}).then( (r) => 
      r.map( (thing) => exchanges.push(thing) )
    )
    // Indices
    yield db.call.get({all: 'indices'}).then( (r) => 
      r.map( (thing) => indices.push(thing) )
    )
    // Stocks
    yield db.call.get({all: 'stocks'}).then( (r) => 
      r.map( (thing) => stocks.push(thing) )
    )
    yield put({ type: 'CLUB_CREATE', payload: clubs })
    yield put({ type: 'INVITATION_CREATE', payload: invitations })
    yield put({ type: 'PROPOSAL_CREATE', payload: proposals })
    yield put({ type: 'EXCHANGE_CREATE', payload: exchanges })
    yield put({ type: 'INDEX_CREATE', payload: indices })
    yield put({ type: 'STOCK_CREATE', payload: stocks })
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