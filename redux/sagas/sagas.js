import { put, takeEvery, all, select } from 'redux-saga/effects'
import { getDatabase } from '../selectors'

//const axios = require('axios');
//const url = 'https://warm-mesa-02274.herokuapp.com';

const log = (arg) => (__DEV__ && console.log(`sagas -> ${arg}`))

//const fetchStocks = () =>
//  axios.get(`${url}/stocks`)
//    .then(result => {
//      log(`fetchStocks: got stocks`)
//      return result.data
//    })
//    .catch(error => {
//      log(`fetchStocks: ${error}`)
//      return error
//    })

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Worker sagas
function* incrementAsync() {
  console.log('EXECUTED')
  yield delay(5000)
  yield put({ type: 'ADD_CLUB' })
}

function* getClubsFromDatabase() {
  console.log('EXECUTED getClubsFromDatabase')
  const db = yield select(getDatabase)
  yield put({ type: 'ADD_CLUB', payload: db })
}

// Watcher sagas
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* watchDbAsync() {
  yield takeEvery('GET_CLUBS_FROM_DATABASE', getClubsFromDatabase)
}

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchDbAsync()
  ])
}