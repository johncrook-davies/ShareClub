import { getExchanges } from '../sync_with_server';
//jest.mock('axios');

describe('Sync with server', () => {
    describe('testing', () => {
        it('tests are working ok', () => {
            expect(1+1).toBe(2)
        })
    })
    describe('getExchanges', () => {
        it('...', async () => {
            expect(await getExchanges()).toEqual([])
        })
    })
})