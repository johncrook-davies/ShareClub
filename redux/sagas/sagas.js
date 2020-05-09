import { put, takeEvery, all, select } from 'redux-saga/effects'
import { getDatabase } from '../selectors'

// DB
import Synchroniser from '../../db/synchroniser';
import { schema } from '../../db/schema';
import seedDatabase from '../../db/seeds';
import { syncWithDatabase } from '../../db/sync_with_server';

const log = (arg) => (__DEV__ && console.log(`sagas -> ${arg}`))

// Worker sagas
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
    throw new Error(`sagas -> initialiseDb: ${e}`)
  } finally {
    yield put({ type: 'CREATE_DB', payload: db })  
  }
}

function* tearDownDb() {
  log('Tearing down database')
  const db = yield select(getDatabase);
  yield db.close()
  yield put({ type: 'DESTROY_DB' })  
}

// Watcher sagas
function* watchInitialiseDb() {
  yield takeEvery('INITIALISE_DB', initialiseDb)
}

function* watchTearDownDb() {
  yield takeEvery('TEAR_DOWN_DB', tearDownDb)
}

export default function* rootSaga() {
  yield all([
    watchInitialiseDb(),
    watchTearDownDb()
  ])
}