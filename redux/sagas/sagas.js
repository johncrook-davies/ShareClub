import { put, takeEvery, all, select } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import { 
  watchInitialiseDb, 
  watchGetAllFromDb,
  watchGetAllFromServer,
  watchTearDownDb 
} from './db';

export default function* rootSaga() {
  yield all([
    watchInitialiseDb(),
    watchGetAllFromDb(),
    watchGetAllFromServer(),
    watchTearDownDb(),
    
  ])
}