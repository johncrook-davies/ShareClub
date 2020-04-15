import {
    mockEchoTest
} from "../__mocks__/react-native-sqlite-storage";
import synchroniser from '../synchroniser';
import seedDatabase from '../seeds';
jest.mock('react-native-sqlite-storage');

var synchdb,
    spy;

describe('synchroniser', () => {
    beforeAll(async () => {
        synchdb = await new synchroniser({
                database: "offlineDatabase.db",
                size: 200000,
                schema: {version: 1}
            },
            false)
        await synchdb.initDb()
        spy = await jest.spyOn(synchdb, '__executeSql__');
        jest.clearAllMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    });
    describe('basic functionality', () => {
        it('tests work ok', () => {
            expect(1+1).toBe(2)
        })
    })
    describe('initDb', () => {
        beforeAll(async () => {
            await synchdb.initDb()
        })
        it('Performs an echotest', async () => {
            expect(mockEchoTest).toHaveBeenCalled()
        })
    })
    describe('get', () => {
        it('calls select all', async () => {
            await synchdb.get({all: 'things'})
            expect(spy).toHaveBeenCalledWith("SELECT * FROM things;")
        })
        it('calls select where x=y', async () => {
            await synchdb.get(
                {all: 'things', where: {type: {isEqualTo: 1}}}
            )
            expect(spy).toHaveBeenCalledWith("SELECT * FROM things WHERE type=1;")
        })
        it('calls select where x<y', async () => {
            await synchdb.get(
                {all: 'things', where: {type: {isLessThan: 1}}}
            )
            expect(spy).toHaveBeenCalledWith("SELECT * FROM things WHERE type<1;")
        })
        it('calls select where x>y', async () => {
            await synchdb.get(
                {all: 'things', where: {type: {isGreaterThan: 1}}}
            )
            expect(spy).toHaveBeenCalledWith("SELECT * FROM things WHERE type>1;")
        })
        it('calls select where multiple conditions', async () => {
            await synchdb.get(
                {all: 'things', where: {type: {isGreaterThan: 1}, name: {isEqualTo: 'Joe'}}}
            )
            expect(spy).toHaveBeenCalledWith("SELECT * FROM things WHERE type>1 AND name='Joe';")
        })
    })
})