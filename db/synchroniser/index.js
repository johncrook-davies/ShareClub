import SQLite from "react-native-sqlite-storage";
import { migrate } from './migrate';
import { handleError } from '../errors';

SQLite.enablePromise(true);
let db;

export default class Synchroniser {
  constructor(props, debug){
    this.props = props;
    this.dg = debug;
    //SQLite.DEBUG(debug); // Uncomment to allow sqlite debug info
  }
  log = (arg) => (this.dg && console.log(`Synchroniser -> ${arg}`))
  async initDb() {
    /*
        Initialises database
        Output: Promise => resolve({executeSql}) : reject(null)
    */
    // Echo test to check that SQLite installed
    await SQLite.echoTest().then(async () => {
      this.log(`echoTest: passed`);
    }).catch(() => {
      this.log(`echoTest: failed`);
    });
    return db
  }
  async openDb() {
    /*
      Opens database
      Output: undefined
    */
    const { database, size, schema } = this.props,
          schemaV = schema.version;
    await SQLite.openDatabase(
      database,
      this.version,
      "Offline database",
      size
    ).then(async (DB) => {
      db = DB
      const exists = await this.exists({version: {id: 1}});
      if(!exists) {
        this.log(`openDb: no version table, migrating`)
        await migrate(db, schema, this.dg)
      } else {
        const dbV = exists.version;
        this.log(`openDb: database version is ${dbV}`)
        this.log(`openDb: schema version is ${schemaV}`)
        if(dbV !== schemaV) {
          migrate(db, schema, this.dg)
        } else {
          this.log(`openDb: no migration required`);
        }
      }
    }).catch(error => handleError(error));
    return db
  }
  close() {
    /*
      Closes database
      Output: undefined
    */
    if (db) {
      db.close().then(() => {
        this.log("close: database closed");
      }).catch(error => {
        handleError(error)
      });
    } else {
      this.log("close: database was not open");
    }
  };
  __executeSql__(sql) {
    /*
      Executes sql statement
      Output: Promise => resolve({}) : reject({})
    */
    this.log(String.raw`executeSql: ${sql}`)
    return db.executeSql(sql)
  };
  async exists(thing) {
    /*
      Checks whether a record exists
      Input: {
          first_attr: {
              isEqualTo: <value>
          }
      }    
      Output: Promise => resolve(record) : reject(input)
    */
    const table = Object.keys(thing)[0],
          record = thing[table],
          id = record.id,
          sql = `SELECT * FROM ${table} WHERE id=${id};`;
      
    return new Promise(async (resolve,reject) => {
      let recordDb;
      if(id === undefined) {
        this.log(`exists: ${table} with id=${id} does not exist`);
        resolve(false)
      } else {
        await this.__executeSql__(sql)
          .then(([result]) => {
            recordDb = result;
            if(recordDb.rows.length > 0) {
              // If database exists, table exists and record exists
              this.log(`exists: ${table} with id=${id} exists`);
              resolve(recordDb.rows.item(0))
            } else {
              // Otherwise resolve to false
              this.log(`exists: ${table} with id=${id} does not exist`);
              resolve(false)
            }
          })
          .catch((e) => {
            // Most likely the table does not exist
            this.log(`exists: ${e.message}`)
            resolve(false)
          })
            
      }
    })
  }
  get(things) {
    /*
      Queries database and returns all records of the specified type that match the specified criteria.
      Input: {
        all: <type of thing>,
        where: {
          first_attr: {
            isEqualTo: <value>
          },
          second_attr: {
            isGreaterThan: <value>
          },
          third_attr: {
            isLessThan: <value>
          }
        }
      }
      Output: Promise
    */
    const { all, where } = things;
    let result = [];
    let sql;
    // Construct query string
    sql = `SELECT * FROM ${all}`
    if(where !== undefined) {
      sql += ` WHERE`
      Object.keys(where).forEach((c,i) => {
        i > 0 ? sql += ' AND' : false
        if(where[c].isEqualTo !== undefined) {
          const criteria = (typeof where[c].isEqualTo === 'string') ? ("'"+where[c].isEqualTo+"'") : where[c].isEqualTo;
          sql += ` ${c}=${criteria}`   
        } else if(where[c].isGreaterThan !== undefined) {
          const criteria = (typeof where[c].isGreaterThan === 'string') ? ("'"+where[c].isGreaterThan+"'") : where[c].isGreaterThan;
          sql += ` ${c}>${criteria}`
        } else if(where[c].isLessThan !== undefined) {
          const criteria = (typeof where[c].isLessThan === 'string') ? ("'"+where[c].isLessThan+"'") : where[c].isLessThan;
          sql += ` ${c}<${criteria}`
        }
      })
    }
    sql += ';';
    // Execute the SQL
    return new Promise((resolve, reject) =>
      this.__executeSql__(sql).then(([results]) => {
        for(let i=0; i<results.rows.length; i++) {
            result.push(results.rows.item(i))
        }
        this.log(`get: found ${results.rows.length} objects`);
        resolve(result)
      }).catch(error => {
        reject(error.message)
      })
    )
  }
  create(obj) {
    /*
      For each object in the object, gets array of objects, gets the keys and and values from each of those objects, adding speach marks to strings and executes sql statement.
      Input: {
        <first type of thing>: [
          {
            first_attr: value1,
            second_attr: value2
          }
        ],
        <second type of thing>: [
          {
            first_attr: value1,
            second_attr: value2
          }
        ]
      }
      Output: Input with ids added
    */
    var newObj = obj;
    // If no id is included then add id to keys and max of id values to values
    for(const things in newObj) {
      obj[things].map((thing) => {
        if(thing['id'] === undefined) {
          // Set id equal to 6 digit random intneger
          thing['id'] = Math.floor(Math.random() * Math.floor(999999));
        }
      });
    }
    // Return promise that executes SQL
    return new Promise((resolve, reject) => {
      for(const things in obj) {
        obj[things].map((thing) => {
          const keys = Object.keys(thing).join(',');
          let values = this.formatValuesForSQL(Object.values(thing)),
              sql;
          // Create a comma delimited string of values.
          values = values.join(',');
          // Execute the insert SQL
          return this.__executeSql__(
            String.raw`INSERT INTO ${things}(${keys}) VALUES (${values});`
          ).then(([results]) => {
            this.log(`create: created ${results.rowsAffected} new ${things}`);
          }).catch(error => {
            reject(error)
          })
        })
      }
      // Return input with id's added
      resolve(newObj)
    })
    
  };
  formatValuesForSQL(values) {
    // Check that values are submitted as an array
    if(!Array.isArray(values)) {
      throw new Error(`formatValuesForSQL -> expected agrument to be an array, insead recieved ${values}`)
    }
    let result = values;
    result.forEach((v,i) => {
      if(typeof v === 'string'){
        result[i] = `"${v}"`
      } else if(Array.isArray(v)) {
        if(!v.some((el) => (typeof el === 'object'))) {
          result[i] = `json_array(${v.map((i)=> String.raw`"${i}"`)})`
        } else {
          result[i] = `json_array(${ String.raw`${[v.map((i)=> String.raw`json('${JSON.stringify(i)}')`)]}`})`
        }
      }
      if(v === null){
        result[i] = `"${0}"`
      }
    })
    return result
  }
  update(obj) {
    /*
      For each set of things in the obj, cycle through
      each thing, get the item using the id, construct
      an update sql string and execute.
      eg syncdb.update({invitations: [{id: 1, user: 'Dave', club: 'Clubs of stuff and things'}]})
      Input: {
        <first type of thing>: [
          {   
            id: id1,
            first_attr: value1,
            second_attr: value2
          }
        ],
        <second type of thing>: [
          {
            id: id2,
            first_attr: value1,
            second_attr: value2
          }
        ]
      }
      Output: undefined
    */
    for(const things in obj) {
      /* If object doesn't exist then update */
      this.log(`Updating ${things}`);
      if(!Array.isArray(obj[things])) {
        throw new Error(
          `Cannot update ${things} because ${things} element of object ${JSON.stringify(obj)} is not an array`
        )
      } 
      obj[things].map(async (thing) => {
        const id = thing.id;
        // Get an array of attributes
        const keys = Object.keys(thing);
        // Get an array of values
        let values = this.formatValuesForSQL(Object.values(thing)),
            sql='';
        // Create a string of attribute1=value1, attribute2=value2...
        keys.forEach((k,i) => {
          if(k !== 'id'){
            sql += String.raw`${k}=${values[i]}`;
            (i < keys.length - 1) ? sql += ', ' : null;
          }
        })
        // Execute the insert SQL
        sql = String.raw`UPDATE ${things} SET ${sql} WHERE id=${id};`;
        this.__executeSql__(sql).then(([results]) => {
          this.log(`Updated ${results.rowsAffected} ${things}`);
        }).catch(error => {
          handleError(error)
        })
      })
    }
  };
  delete(thing,id) {
    /*
      Deleted item with id.
      Inputs: 
          thing: string name of type of thing
          id: integer id
      Output: Void
    */
    let sql = `DELETE FROM ${thing} WHERE id=${id};`;
    // Execute the delete SQL
    return new Promise((resolve,reject) => {
      this.__executeSql__(sql).then(([results]) => {
        this.dg && console.log(`delete: deleted ${results.rowsAffected} ${thing}`);
        resolve(results.rows.item(0))
      }).catch(error => {
        reject(error)
      })
    })
  }
  deleteAll(things) {
    /*
      Deleted all items of a specific kind.
      Input: String name of type of item
      to be deleted.
      Input: String name of things
      Output: Void
    */
    const sql = `DELETE FROM ${things};`;
    // Execute the delete SQL
    this.__executeSql__(sql).then(([results]) => {
      this.log(`deleteAll: deleted ${results.rowsAffected} ${things}`);
    }).catch(error => {
      handleError(error)
    })
  }
}