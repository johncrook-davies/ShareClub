export default async function seedDatabase(syncdb) {
    await syncdb.deleteAll('invitations')
    await syncdb.deleteAll('clubs')
    await syncdb.deleteAll('proposals')
    syncdb.create({
        invitations: [
            {
                id: 1,
                name: 'Tess Yellanda',
                club: 'Original Pirate Investors'
            },
            {
                id: 2,
                name: 'Rob Brown',
                club: "Investors not haters"
            }
        ],
        clubs: [
            {
                id: 1,
                name: 'The jolly savers',
                value: 3456.64
            },
            {
                id: 2,
                name: 'Cash club',
                value: 10325
            },
            {
                id: 3,
                name: 'Big money mondays',
                value: 103259823.23
            }
        ],
        proposals: [
            {
                id: 1,
                name: 'Dan James',
                trades: JSON.stringify([
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
                ])
            },
            {
                id: 2,
                name: 'Dave Smith',
                trades: JSON.stringify([
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
                ])
            }
        ]
    })
}