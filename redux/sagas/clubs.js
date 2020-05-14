import { put, takeEvery, all, select, call } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import { CLUB_CREATE, CLUB_UPDATE } from "../actionTypes";

const log = (arg) => (__DEV__ && console.log(`sagas -> clubs -> ${arg}`))

// Create record in database if it doesn't exist
export function* createInDatabase(props) {
  log('createInDatabase')
  const db = yield select(getDatabase);
  if(Array.isArray(props.payload)) {
    let clubs = props.payload;
    // -------- PENDING -----------
  } else {
    let club = props.payload;
    try {
      let exists = yield call([db.call, 'exists'], {clubs: {id: club.id}});
      if(!exists) {
        // Did not find record
        // Create new record in database
        let record = yield call([db.call, 'create'], {clubs: [club]})
        // Update state with id of record
        yield put({ type: CLUB_UPDATE, payload: record })
      } else {
        // Found record
        throw new Error('syncWithDatabase: record already exists in database')
      }
    } catch(e) {
      throw new Error(e)
    }
  }
}

// Update in database if it exists and isn't the same
export function* updateInDatabase(props) {
  log('updateInDatabase')
  const db = yield select(getDatabase);
  let club = props.payload;
  console.log(club)
}

// Watcher sagas
export function* watchClubCreate() {
  yield takeEvery(CLUB_CREATE, createInDatabase)
}

// Watcher sagas
export function* watchClubUpdate() {
  yield takeEvery(CLUB_UPDATE, updateInDatabase)
}