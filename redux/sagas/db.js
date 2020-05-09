import { put, takeEvery, all, select } from 'redux-saga/effects'
import { getDatabase } from '../selectors'

// DB
import Synchroniser from '../../db/synchroniser';
import { schema } from '../../db/schema';
import seedDatabase from '../../db/seeds';
import { syncWithDatabase } from '../../db/sync_with_server';

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
    yield synchroniseStateWithDb()
  }
}

function* tearDownDb() {
  log('tearDownDb')
  const db = yield select(getDatabase);
  yield (db.readState === 'ready') && db.close();
  yield put({ type: 'DESTROY_DB' });  
}

function* synchroniseStateWithDb() {
  log('synchroniseWithDb')
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
    throw new Error(`sagas -> db -> synchroniseWithDb: ${e}`)
  }
}

// Watcher sagas
export function* watchInitialiseDb() {
  yield takeEvery('INITIALISE_DB', initialiseDb)
}

export function* watchSynchroniseStateWithDb() {
  yield takeEvery('SYNCHRONISE_STATE_WITH_DB', synchroniseStateWithDb)
}

export function* watchTearDownDb() {
  yield takeEvery('TEAR_DOWN_DB', tearDownDb)
}