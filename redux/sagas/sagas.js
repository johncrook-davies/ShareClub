import { put, takeEvery, all, select } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import { 
  watchInitialiseDb, 
  watchSynchroniseStateWithDb,
  watchTearDownDb 
} from './db';

export default function* rootSaga() {
  yield all([
    watchInitialiseDb(),
    watchSynchroniseStateWithDb(),
    watchTearDownDb()
  ])
}