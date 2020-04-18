const axios = require('axios');
                      
export const getExchanges = () => {
    return new Promise(resolve => {
        axios.get('https://warm-mesa-02274.herokuapp.com/exchanges')
            .then(result => resolve(result.data))
    })
}

export const getStocks = () => {
    return new Promise(resolve => {
        axios.get('https://warm-mesa-02274.herokuapp.com/stocks')
            .then(result => resolve(result.data))
    })
}