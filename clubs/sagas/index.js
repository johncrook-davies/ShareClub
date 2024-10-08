import { put, takeEvery, all, select, call } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import { CLUB_CREATE, CLUB_UPDATE, CLUB_DELETE } from "../actions/actionTypes";
import { compareTwoThings } from './helpers';

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
        console.log('syncWithDatabase: record already exists in database')
      }
    } catch(e) {
      throw new Error(e)
    }
  }
}

// Update in database if it exists and isn't the same
export function* updateInDatabase(props) {
  log('updateInDatabase')
  let club = props.payload;
  // Check if record has an id
  if(club.id === undefined) {
    throw new Error('Cannot update record without specifying id')
  }
  // Get database
  const db = yield select(getDatabase);
  // Check if record exists
  try {
    let exists = yield call([db.call, 'exists'], {clubs: {id: club.id}});
    if(!exists) {
      // Did not find record
      throw new Error(`Could not find record with id=${club.id}`)
    } else {
      // Check if record is identical to database
      if(compareTwoThings(exists,club) == {}) {
        // Record is identical to that in database
      } else {
        // Record in database requires update
        yield call([db.call, 'update'], {clubs: [club]})
      }
    }
  } catch(e) {
    throw new Error(e)
  }
}

// Delete club in database if it exists
export function* deleteInDatabase(props) {
  log('deleteInDatabase')
  let id = props.payload;
  // Check if payload is a number
  if(typeof id !== 'number') {
    throw new Error('Specified id must be a number')
  }
  // Get database
  const db = yield select(getDatabase);
  // Check if record exists
  try {
    let exists = yield call([db.call, 'exists'], {clubs: {id: id}});
    if(!exists) {
      // Did not find record
      throw new Error(`Could not find record with id=${club.id}`)
    } else {
      // Delete record
      yield call([db.call, 'delete'], 'clubs', id)
    }
  } catch(e) {
    throw new Error(e)
  }   
}

// Watcher sagas
export function* watchClubCreate() {
  yield takeEvery(CLUB_CREATE, createInDatabase)
}

export function* watchClubUpdate() {
  yield takeEvery(CLUB_UPDATE, updateInDatabase)
}

export function* watchClubDelete() {
  yield takeEvery(CLUB_DELETE, deleteInDatabase)
}