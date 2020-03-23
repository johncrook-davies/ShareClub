const initialState = {
    all: [
        {
            id: 129731273,
            user: 'Dan James',
            trades: [
                {
                    name: "Higher Skin Industries",
                    symbol: "HSK",
                    type: 'buy',
                    value: 837
                },
                {
                    name: "Sudo Foods",
                    symbol: "SUDO",
                    type: 'buy',
                    value: 223
                },
                {
                    name: "Cash",
                    symbol: "CASH",
                    type: 'sell',
                    value: -1000
                }
            ]
        },
        {
            id: 80423,
            user: 'Dave Smith',
            trades: [
                {
                    name: 'Sydney Financial',
                    symbol: 'SYDO',
                    type: 'sell',
                    value: -234
                },
                {
                    name: 'Yoda Ku Technologies',
                    symbol: 'YDKF',
                    type: 'buy',
                    value: 234
                }
            ]
        }
    ],
    find: {
        129731273: {
            id: 129731273,
            user: 'Dan James',
            trades: [
                {
                    name: "Higher Skin Industries",
                    symbol: "HSK",
                    type: 'buy',
                    value: 837
                },
                {
                    name: "Sudo Foods",
                    symbol: "SUDO",
                    type: 'buy',
                    value: 223
                },
                {
                    name: "Cash",
                    symbol: "CASH",
                    type: 'sell',
                    value: -1000
                }
            ]
        },
        80423: {
            id: 80423,
            user: 'Dave Smith',
            trades: [
                {
                    name: 'Sydney Financial',
                    symbol: 'SYDO',
                    type: 'sell',
                    value: -234
                },
                {
                    name: 'Yoda Ku Technologies',
                    symbol: 'YDKF',
                    type: 'buy',
                    value: 234
                }
            ]
        }
    }
};

export default function(state = initialState, action) {
    return state
}