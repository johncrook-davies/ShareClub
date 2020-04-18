import { 
    getExchanges,
    getStocks
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
        it('...', async () => {
            let r = apiReturns.exchanges.data;
            expect(await getExchanges()).toEqual(r)
        })
    })
    describe('getStocks', () => {
        it('...', async () => {
            let r = apiReturns.stocks.data;
            expect(await getStocks()).toEqual(r)
        })
    })
})