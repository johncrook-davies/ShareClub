import apiReturns from './api_returns';
const axios = jest.genMockFromModule('axios');

const mockGet = jest.fn((str) => {
    let returnVal;
    if(str.search('exchanges/LON') !== -1) {
        returnVal = apiReturns.exchange;
    } else if(
        (str.search('stocks/APQ-LN') !== -1)
    ) {
        returnVal = apiReturns.stock;
    } else if(
        (str.search('exchanges/') !== -1)
    ) {
        returnVal = 'error'
    } else if(
        (str.search('stocks/') !== -1)
    ) {
        returnVal = 'error'
    } else if(
        (str.search('exchanges') !== -1)
    ) {
        returnVal = apiReturns.exchanges;
    } else if(
        (str.search('stocks') !== -1)
    ) {
        returnVal = apiReturns.stocks;
    }
    return new Promise( (resolve,reject) => {
        if(returnVal === 'error'){
            reject(new Error('message'))
        } else {
            resolve(returnVal) 
        }        
    })
})

axios.get = mockGet;

module.exports = axios;