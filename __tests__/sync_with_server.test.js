import { 
    getExchanges,
    getStocks,
    getExchange,
    getStock
} from '../sync_with_server';
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
    describe('getExchange', () => {
        it('returns details of exchange', async () => {
            let r = apiReturns.exchange.data;
            expect(await getExchange('LON')).toEqual(r)
        })
        it.skip('returns null for invalid exchange', async () => {
            // Doesn't work with mock
            await expect(getExchange('NOTANEXCHANGE')).rejects.toEqual(null)
        })
    })
    describe('getStock', () => {
        it('returns details of stock', async () => {
            let r = apiReturns.stock.data;
            expect(await getStock('APQ-LN')).toEqual(r)
        })
        it.skip('returns null for invalid stock', async () => {
            // Doesn't work with mock
            await expect(getStock('NOTASTOCK')).rejects.toEqual(null)
        })
    })
})