const axios = require('axios');
const url = 'https://warm-mesa-02274.herokuapp.com';
  
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
    return new Promise((resolve,reject) => {
        axios.get(`${url}/exchanges/${ex}`)
            .then(result => resolve(result.data))
            .catch(error => reject(handleApiError(error)))
    })
}

export const getStock = (stock) => {
    return new Promise((resolve,reject) => {
        axios.get(`${url}/stocks/${stock}`)
            .then(result => resolve(result.data))
            .catch(error => reject(handleApiError(error)))
    })
}