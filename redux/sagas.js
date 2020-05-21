import { put, takeEvery, all, select } from 'redux-saga/effects';
import { 
  watchInitialiseDb, 
  watchGetAllFromServer,
  watchTearDownDb, 
} from '../db/sagas';
import { 
  watchClubCreate,
  watchClubUpdate,
  watchClubDelete,
} from '../clubs/sagas';

export default function* rootSaga() {
  yield all([
    watchInitialiseDb(),
    watchGetAllFromServer(),
    watchTearDownDb(),
    watchClubCreate(),
    watchClubUpdate(),
    watchClubDelete(),
  ])
}