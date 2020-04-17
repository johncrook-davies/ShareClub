const axios = require('axios');
                      
export const getExchanges = (syncdb) => {
    return new Promise(resolve => {
        axios.get('https://warm-mesa-02274.herokuapp.com/exchanges')
            .then(result => resolve(result.data))
    })
}