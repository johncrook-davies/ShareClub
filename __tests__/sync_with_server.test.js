import { getExchanges } from '../sync_with_server';
import apiReturns from '../__mocks__/api_returns';
//jest.mock('axios'); // Uncomment to disable api calls
jest.unmock('axios'); // Uncomment to enable api calls

describe('Sync with server', () => {
    describe('testing', () => {
        it('tests are working ok', () => {
            expect(1+1).toBe(2)
        })
    })
    describe('getExchanges', () => {
        it('...', async () => {
            let r = apiReturns.exchange.data;
            expect(await getExchanges()).toEqual(r)
        })
    })
})