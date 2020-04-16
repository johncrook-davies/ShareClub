import {
    mockEchoTest
} from "../__mocks__/react-native-sqlite-storage";
import synchroniser from '../synchroniser';
import seedDatabase from '../seeds';
jest.mock('react-native-sqlite-storage');

var synchdb,
    spy;

// Create a mock sql execution function
const mock__executeSql__ = jest.fn((sql) => {
    const exists = sql.search('exists') === -1 ? false : true;
    const prom = new Promise( (resolve,reject) => {
        const row = {a: 'v'},
              returnFound = [{
                  "insertId": 1, 
                  "rows": {
                      "item": () => row,
                      "length": 1,
                      "raw": () => {}
                  }
              }],
              returnNotFound = [{
                  "insertId": 1, 
                  "rows": {
                      "item": () => [],
                      "length": 0,
                      "raw": () => {}
                  }
              }];
        if(exists) {
            resolve(returnFound)
        } else {
            reject(returnNotFound)
        }
    })
    return prom
});

describe('synchroniser', () => {
    beforeEach(async () => {
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
    
    describe('testing', () => {
        it('tests are working ok', () => {
            expect(1+1).toBe(2)
        })
    })
    
    describe('initDb', () => {
        it('Performs an echotest', async () => {
            await synchdb.initDb()
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
            expect(spy).toHaveBeenNthCalledWith(1, "UPDATE records SET name='Dave', type='person' WHERE id=1;")
        })
    })
    
    describe('exists sql call', () => {
        it('calls get', async () => {
            synchdb.exists({records: {id: 1}})
            expect(spy).toHaveBeenNthCalledWith(1, "SELECT * FROM records WHERE id=1;")
        })
    })
    
    describe('exists return value', () => {
        beforeEach(async () => {
            // Overide sql execution function
            synchdb.__executeSql__ = mock__executeSql__;
        })
        it('handles record exists by returning record', async () => {
            const t = await synchdb.exists({records: {id: 'exists'}});
            expect(t).toEqual({"a": "v"});
        });
        it('handles invalid records by rejecting input', async () => {
            await synchdb.exists({records: {id: 'nope'}}).then((result) => {
                throw new Error('Resolved when it should not have.')
            }).catch((error) => {
                expect(error).toEqual({id: 'nope'})
            })
        })
    })
    
    describe('delete sql call', () => {
        it('calls delete record where id is...', async () => {
            await synchdb.delete('records', 1)
            expect(spy).toHaveBeenNthCalledWith(1, "DELETE FROM records WHERE id=1;")
        })
    })
})