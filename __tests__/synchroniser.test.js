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
    
    describe('create', () => {
        it('calls insert for single record', async () => {
            await synchdb.create({records: [{name: 'Dave', type: 'person'}]})
            expect(spy).toHaveBeenCalledWith("INSERT INTO records(name,type) VALUES ('Dave','person');")
        })
        it('calls insert for multiple records', async () => {
            await synchdb.create({records: [{name: 'Dave', type: 'person'}, {name: 'Steve', type: 'zebra'}]})
            expect(spy).toHaveBeenNthCalledWith(1,"INSERT INTO records(name,type) VALUES ('Dave','person');")
            expect(spy).toHaveBeenNthCalledWith(2,"INSERT INTO records(name,type) VALUES ('Steve','zebra');")
        })
        it('calls insert for multi record types', async () => {
            await synchdb.create({people: [{name: 'Dave', type: 'person'}], animals: [{name: 'Steve', type: 'zebra'}]})
            expect(spy).toHaveBeenNthCalledWith(1,"INSERT INTO people(name,type) VALUES ('Dave','person');")
            expect(spy).toHaveBeenNthCalledWith(2,"INSERT INTO animals(name,type) VALUES ('Steve','zebra');")
        })
    })
    
    describe('update', () => {
        it('calls update for single record', async () => {
            synchdb.update({records: [{id: 1, name: 'Dave', type: 'person'}]})
            //expect(spy).toHaveBeenNthCalledWith(1, "SELECT * FROM records WHERE id=1;")
            expect(spy).toHaveBeenNthCalledWith(1, "UPDATE records SET name='Dave', type='person' WHERE id=1;")
        })
    })
})