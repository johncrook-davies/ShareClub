const SQLite = jest.genMockFromModule('react-native-sqlite-storage');

const sampleReturn = [{
    rows : {
        item: () => {version: 1}
    }
}]

export const dbObject = {
    executeSql: jest.fn(() => {
        return new Promise( resolve => {
            resolve(sampleReturn) 
        })
    })
}

export const mockEnablePromise = jest.fn();
export const mockEchoTest = jest.fn(() => {
    return new Promise( resolve => {
        resolve(true)         
    })
})
export const mockOpenDatabase = jest.fn(() => {
    return new Promise( resolve => resolve(dbObject) )
})

SQLite.enablePromise = mockEnablePromise
SQLite.echoTest = mockEchoTest
SQLite.openDatabase = mockOpenDatabase

export default SQLite;