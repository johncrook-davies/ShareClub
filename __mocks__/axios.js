import apiReturns from './api_returns';
const axios = jest.genMockFromModule('axios');

const mockGet = jest.fn(() => {
    console.log('EXECUTED')
    return new Promise( resolve => {
        resolve(apiReturns.exchange)         
    })
})

axios.get = mockGet;

module.exports = axios;