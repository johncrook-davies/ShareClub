import { put, takeEvery, all, select, call } from 'redux-saga/effects';
import { getDatabase } from '../selectors';

const log = (arg) => (__DEV__ && console.log(`sagas -> clubs -> ${arg}`))

export function* createClub(payload) {
  log('createClub')
  const club = payload;
  const db = yield select(getDatabase);
  try {
    yield put({ type: 'CREATE_CLUB', club })
  } catch(e) {
    throw new Error(`sagas -> clubs -> createClub: ${e}`)
  }
  try {
    yield call(db.call.create, {clubs: club})
  } catch(e) {
    throw new Error(`sagas -> clubs -> createClub: ${e}`)
  }
}

// Watcher sagas
export function* watchCreateClub() {
  yield takeEvery('CREATE_CLUB', createClub)
}