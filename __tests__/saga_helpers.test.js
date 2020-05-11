import { 
    getExchanges,
    getStocks,
    getExchange,
    getStock,
    diffBetweenTwoObjects,
    diffBetweenTwoArraysOfObjects
} from '../redux/sagas/helpers';
import apiReturns from '../__mocks__/api_returns';
jest.mock('axios'); // Uncomment to disable api calls
//jest.unmock('axios'); // Uncomment to enable api calls

describe('Sync with server', () => {
    describe('testing', () => {
        it('tests are working ok', () => {
            expect(1+1).toBe(2)
        })
    })
    describe('getExchanges', () => {
        it('returns list of exchanges', async () => {
            let r = apiReturns.exchanges.data;
            expect(await getExchanges()).toEqual(r)
        })
    })
    describe('getStocks', () => {
        it('returns list of stocks', async () => {
            let r = apiReturns.stocks.data;
            expect(await getStocks()).toEqual(r)
        })
    })
//    describe('getExchange', () => {
//        it('returns details of exchange', async () => {
//            let r = apiReturns.exchange.data;
//            expect(await getExchange('LON')).toEqual(r)
//        })
//        it.skip('returns null for invalid exchange', async () => {
//            // Doesn't work with mock
//            await expect(getExchange('NOTANEXCHANGE')).rejects.toEqual(null)
//        })
//    })
//    describe('getStock', () => {
//        it('returns details of stock', async () => {
//            let r = apiReturns.stock.data;
//            expect(await getStock('APQ-LN')).toEqual(r)
//        })
//        it.skip('returns null for invalid stock', async () => {
//            // Doesn't work with mock
//            await expect(getStock('NOTASTOCK')).rejects.toEqual(null)
//        })
//    })
    describe('diffBetweenTwoObjects', () => {
        it('returns changes, additions and deletions', () => {
            const a = {
                property1: 'thing',
                property2: 'another',
                property3: 3
            };
            const b = {
                property1: 'thing',
                property2: 'different',
                property4: 'stuff'
            };
            expect(diffBetweenTwoObjects(a,b))
                .toEqual({
                    create: {property4: 'stuff'},
                    update: {property2: 'different'},
                    destroy: {property3: 3}
                })
        })
    })
    describe('diffBetweenTwoArraysOfObjects', () => {
        it('returns changes, additions and deletions', () => {
            const a = [
                {
                    id: 1,
                    property1: 'thing',
                    property2: 'another',
                    property3: 3
                },
                {
                    id: 2,
                    property1: 'stuff',
                    property2: 'another stuff',
                    property3: 4
                },
                {
                    id: 3,
                    property1: 'old thing',
                    property2: 'old thing deets',
                    property3: 3
                }
            ];
            const b = [
                {
                    id: 1,
                    property1: 'thing',
                    property2: 'different',
                    property4: 'stuff'
                },
                {
                    id: 2,
                    property1: 'stuff',
                    property2: 'another stuff',
                    property3: 4
                },
                {
                    id: 4,
                    property1: 'new thing',
                    property2: 'new thing deets',
                    property3: 564
                }
            ];
            expect(diffBetweenTwoArraysOfObjects(a,b))
                .toEqual({
                    create: [
                        {
                            id: 4,
                            property1: 'new thing',
                            property2: 'new thing deets',
                            property3: 564
                        }
                    ],
                    update: [
                        {
                            id: 1,
                            create: {property4: 'stuff'},
                            update: {property2: 'different'},
                            destroy: {property3: 3}
                        }
                    ],
                    destroy: [
                        {
                            id: 3,
                            property1: 'old thing',
                            property2: 'old thing deets',
                            property3: 3
                        }
                        
                    ]
                })
        })
    })
})