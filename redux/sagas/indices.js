import { put, takeEvery, all, select } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
const axios = require('axios');

const url = 'https://warm-mesa-02274.herokuapp.com';

const log = (arg) => (__DEV__ && console.log(`sagas -> indices -> ${arg}`));

function* getIndicesFromServer(){
  log('getIndicesFromServer')
  let indices;
  try {
    yield getIndices().then((i) => {return indices = i})
  } catch(e) {
    throw new Error(`sagas -> indices -> getIndicesFromServer: ${e}`)
  } finally {
    yield put({ type: 'INDEX_CREATE', payload: indices })
  }
}

const getIndices = () => {
  return new Promise(resolve => {
    log(`getIndices`)
    axios.get(`${url}/indices`)
      .then(result => {
        let returnVal = [];
        result.data.map((d) => {
          let ind = d.index;
          ind['stocks'] = d.stocks.map((s) => s.symbol)
          if(ind.symbol != 'UNK') {
            returnVal.push(ind)
          }
        })
        resolve(returnVal)
      })
  })
}

export function* watchGetIndicesFromServer() {
  yield takeEvery('GET_INDICES_FROM_SERVER', getIndicesFromServer)
}