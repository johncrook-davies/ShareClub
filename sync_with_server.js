const axios = require('axios');
const url = 'https://warm-mesa-02274.herokuapp.com';
                      
export const getExchanges = () => {
    return new Promise(resolve => {
        axios.get(`${url}/exchanges`)
            .then(result => resolve(result.data))
    })
}

export const getStocks = () => {
    return new Promise(resolve => {
        axios.get(`${url}/stocks`)
            .then(result => resolve(result.data))
    })
}

export const getExchange = (ex) => {
    return new Promise(resolve => {
        axios.get(`${url}/exchanges/${ex}`)
            .then(result => resolve(result.data))
    })
}