const axios = require('axios');
const url = 'https://warm-mesa-02274.herokuapp.com';
  
const log = (arg) => (__DEV__ && console.log(`sync_with_server -> ${arg}`))

const handleApiError = (error) => {
    switch(error.response.status) {
        case 404:
            return null
            break;
        default:
            return 'Unknown error'
    }
}

export const getExchanges = () => {
    return new Promise(resolve => {
        axios.get(`${url}/exchanges`)
            .then(result => {
                log(`getStocks: got exchanges`)
                resolve(result.data)
            })
    })
}

export const getStocks = () => {
    return new Promise(resolve => {
        axios.get(`${url}/stocks`)
            .then(result => {
                log(`getStocks: got stocks`)
                resolve(result.data)
            })
    })
}

export const getExchange = (ex) => {
    return new Promise((resolve,reject) => {
        axios.get(`${url}/exchanges/${ex}`)
            .then(result => {
                log(`getExchange: got exchange ${ex}`)
                resolve(result.data)
            })
            .catch(error => {
                log(`getExchange: could not find exchange ${ex}`)
                reject(handleApiError(error))
            })
    })
}

export const getStock = (stock) => {
    return new Promise((resolve,reject) => {
        axios.get(`${url}/stocks/${stock}`)
            .then(result => {
                log(`getStock: got stock ${stock}`)
                resolve(result.data)
            })
            .catch(error => {
                log(`getExchange: could not find stock ${stock}`)
                reject(handleApiError(error))
            })
    })
}