const axios = jest.genMockFromModule('react-native-sqlite-storage');

const returnVals = {
    exchange: JSON.parse([
        {
            "created_at": "2020-04-05T13:21:09.503Z",
            "exchange_suffix": "-LN",
            "id": 1,
            "mic": null,
            "name": "London Stock Exchange",
            "region": "gb",
            "symbol": "LON",
            "updated_at": "2020-04-05T13:21:09.503Z",
        }
    ])
}

const mockGetExchanges = jest.fn(() => {
    return new Promise( resolve => {
        resolve(returnVals.exchange)         
    })
})

axios.getExchanges = mockGetExchanges

export default axios;