const axios = require('axios');
const url = 'https://warm-mesa-02274.herokuapp.com';

export const syncWithDatabase = async (syncdb) => {
    syncOneThingWithDatabase(
        'exchanges', 
        syncdb, 
        getExchanges
    )
    syncOneThingWithDatabase(
        'indices', 
        syncdb, 
        getIndices
    )
    syncOneThingWithDatabase(
        'stocks', 
        syncdb, 
        getStocks
    )
}

const syncOneThingWithDatabase = async (things, db, getFromServerMethod) => {
    log(`syncWithDatabase: started database ${things} syncronisation`)
    const inDb = await db.get({all: things})
        .catch(error => {
            throw new Error(`\n\nsync_with_server -> syncWithDatabase -> synchroniser: ${error}\n`)
        }),
        onServer = await getFromServerMethod(),
        differences = compareTwoThings(inDb,onServer);
    // Create new stocks
    if(differences.create.length > 0){
        let obj = {};
        obj[things] = differences.create;
        db.create(obj)
    }
    // Delete old stocks
    if(differences.destroy.length > 0){
        differences.destroy.map((record) => {
            db.delete(things, record.id)
        })
    }
    // Update existing stocks
    if(differences.update.length > 0){
        differences.update.map((record) => {
            let obj = {};
            obj[things] = {id: record.id, ...record.update}
            db.update(obj)
        })
    }
}

export const getExchanges = () => {
    return new Promise(resolve => {
        axios.get(`${url}/exchanges`)
            .then(result => {
                log(`getStocks: got exchanges`)
                resolve(result.data)
            })
    })
}

export const getIndices = () => {
    return new Promise(resolve => {
        axios.get(`${url}/indices`)
            .then(result => {
                log(`getIndices: got indices`)
                resolve(result.data)
            })
    })
}

export const getStocks = () => {
    return new Promise(resolve => {
        axios.get(`${url}/stocks`)
            .then(result => {
                log(`getStocks: got stocks`)
                resolve(result.data)
            })
    })
}

export const getExchange = (ex) => {
    return new Promise((resolve,reject) => {
        axios.get(`${url}/exchanges/${ex}`)
            .then(result => {
                log(`getExchange: got exchange ${ex}`)
                resolve(result.data)
            })
            .catch(error => {
                log(`getExchange: could not find exchange ${ex}`)
                reject(handleApiError(error))
            })
    })
}

export const getStock = (stock) => {
    return new Promise((resolve,reject) => {
        axios.get(`${url}/stocks/${stock}`)
            .then(result => {
                log(`getStock: got stock ${stock}`)
                resolve(result.data)
            })
            .catch(error => {
                log(`getExchange: could not find stock ${stock}`)
                reject(handleApiError(error))
            })
    })
}

function compareTwoThings(a,b) {
    if(Array.isArray(a) && Array.isArray(b)) {
        return diffBetweenTwoArraysOfObjects(a,b)
    } else if((typeof a === 'object') && (typeof b === 'object') ) {
        return diffBetweenTwoObjects(a,b)
    } else {
        throw new Error('compareTwoThings: error with arguments, they are not the same type or not objects or arrays.')
    }
}
export function diffBetweenTwoArraysOfObjects(a,b) {
    /*
        Returns additions, updates and deletions neccesary for a to equal b
        Input:
            a: Array[Object]
            b: Array[Object]
        Output:
            {
                create: Array[Object],
                destroy: Array[Object],
                update: Array[Object]
            }
    */
    let result = {},
        inBothArrays,
        update;
    // In a but not b
    result.destroy = a.filter((obj) => {
        let id = obj.id;
        return b.every((b_element) => {return b_element.id !== obj.id})
    })
    // In b but not a
    result.create = b.filter((obj) => {
        let id = obj.id;
        return a.every((a_element) => {return a_element.id !== id})
    })
    // In both a and b
    inBothArrays = b.filter((obj) => {
        let id = obj.id;
        return a.some((a_element) => {return a_element.id === id})
    })
    update = inBothArrays.map((obj) => {
        let oldElement = a.filter((a_element) => {return a_element.id === obj.id})[0];
        let changes = diffBetweenTwoObjects(oldElement,obj);
        changes.id = obj.id;
        return changes
    })
    result.update = update.filter((el) => {
        return Object.keys(el).length > 1
    })
    return result;
}
export function diffBetweenTwoObjects(a,b) {
    /*
        Returns additions, updates and deletions neccesary for a to equal b
        Input:
            a: Object
            b: Object
        Output:
            {
                create: Object,
                destroy: Object,
                update: Object
            }
    */
    let result = {};
    for(prop in a) {
        if(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
            // In both a and b
            if(a[prop] === '0' && b[prop] === null) {
                // Make sure zero and null are classified as equal
            } else {
                if(a[prop] !== b[prop]) {
                    let chng = {};
                    chng[prop] = b[prop];
                    result.update = chng;
                }  
            }
        } else if(a.hasOwnProperty(prop)) {
            // Just in a
            let chng = {};
            chng[prop] = a[prop];
            result.destroy = chng;
        }
    }
    for(prop in b) {
        if(b.hasOwnProperty(prop) && !a.hasOwnProperty(prop)) {
            // Just in b
            let chng = {};
            chng[prop] = b[prop];
            result.create = chng;
        }
    }
    return result;
}

const log = (arg) => (__DEV__ && console.log(`sync_with_server -> ${arg}`))

const handleApiError = (error) => {
    switch(error.response.status) {
        case 404:
            return null
            break;
        default:
            return 'Unknown error'
    }
}