import apiReturns from './api_returns';
const axios = jest.genMockFromModule('axios');

const mockGet = jest.fn((str) => {
    let returnVal;
    if(str.search('exchanges/') !== -1) {
        returnVal = apiReturns.exchange;
    } else if(
        (str.search('stocks/') !== -1)
    ) {
        returnVal = apiReturns.stock;
    } else if(
        (str.search('exchanges') !== -1)
    ) {
        returnVal = apiReturns.exchanges;
    } else if(
        (str.search('stocks') !== -1)
    ) {
        returnVal = apiReturns.stocks;
    }
    return new Promise( resolve => {
        resolve(returnVal)         
    })
})

axios.get = mockGet;

module.exports = axios;