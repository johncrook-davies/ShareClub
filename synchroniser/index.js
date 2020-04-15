import SQLite from "react-native-sqlite-storage";
import { migrate } from './migrate';
import { handleError } from '../errors';

SQLite.enablePromise(true);
let db;

export default class syncroniser {
    constructor(props, debug){
        this.props = props;
        this.dg = debug;
        this.version = props.schema.version;
        //SQLite.DEBUG(debug); // Uncomment to allow sqlite debug info
    }
    initDb(callback) {
        /*
            Performs an echotest to ensure that 
            the SQLite library is present. If so
            it opens the database. It checks the 
            version of the database against the 
            current version of the schema. If the
            versions are different then it performs
            a migration.
            Input: callback function to be called 
            once database has been created
            Input: Function callback to be executed
            once database is open.
            Output: undefined
        */
        const { database, size, schema } = this.props;
        SQLite.echoTest().then(() => {
            // Open database
            SQLite.openDatabase(
                database,
                this.version,
                "Offline database",
                size
            ).then((DB) => {
                db = DB
                this.dg && console.log("Database OPENED");
                // Check database version and if different migrate
                this.__executeSql__('SELECT version FROM version WHERE version_id=1;').then(([v]) =>{
                    this.dg && console.log(`Current database version is`,v.rows.item(0).version)
                    this.dg && console.log(`Schema version is`,this.version)
                    if(v.rows.item(0).version !== this.version){
                        migrate(db, schema, this.dg)
                    } else {
                        this.dg && console.log(`No migration required`)
                    }
                }).then(callback).catch(error => {
                    this.dg && console.log(`No database tected, migrating...`)
                    migrate(db, schema, this.dg)
                });
            }).catch(error => handleError(error));
        }).catch(error => handleError(error));
        
    };
    close() {
        /*
            Checks if the database is non-null
            If it is then close it otherwise 
            log a message
            Input: None
            Output: undefined
        */
        if (db) {
            db.close().then(() => {
                this.dg && console.log("Database CLOSED");
            }).catch(error => {
                handleError(error)
            });
        } else {
            this.dg && console.log("Database was not OPENED");
        }
    };
    __executeSql__(sql) {
        return db.executeSql(sql)
    };
    create(obj) {
        /*
            For each object in the object, gets
            array of objects, gets the keys and
            and values from each of those objects,
            adding speach marks to strings and 
            executes sql statement.
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
            Output: undefined
        */
        for(const things in obj) {
            this.dg && console.log(`Creating new ${things}`);
            obj[things].map((thing) => {
                const keys = Object.keys(thing).join(',');
                var values = Object.values(thing),
                    sql
                // Ensure string values are enclosed by speach marks
                values.forEach((v,i) => {
                    if(typeof v === 'string'){
                        values[i] = "'"+v+"'"
                    }
                })
                // Create a comma delimited string of values
                values = values.join(',');
                // Execute the insert SQL
                sql = `INSERT INTO ${things}(${keys}) VALUES (${values});`;
                this.dg && console.log(sql);
                db.executeSql(sql).then(([results]) => {
                    this.dg && console.log(`Created ${results.rowsAffected} new ${things}`);
                }).catch(error => {
                    handleError(error)
                })
            })
        }
    };
    update(obj) {
        /*
            For each set of things in the obj, cycle through
            each thing, get the item using the id, construct
            an update sql string and execute.
            eg syncdb.update({invitations: [{id: 1, user: 'Dave', club: 'Clubs of stuff and things'}]})
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
            Output: undefined
        */
        for(const things in obj) {
            /* If object doesn't exist then update */
            this.dg && console.log(`Updating ${things}`);
            obj[things].map((thing) => {
                // Find thing
                this.get({all: things, where: {id: {isEqualTo: thing.id}}}).then(([t]) => {
                    // Get an array of attributes
                    const keys = Object.keys(thing);
                    // Get an array of values
                    var values = Object.values(thing),
                        sql='';
                    // Ensure string values are enclosed by speach marks
                    values.forEach((v,i) => {
                        if(typeof v === 'string'){
                            values[i] = "'"+v+"'"
                        }
                    })
                    // Create a string of attribute1=value1, attribute2=value2...
                    keys.forEach((k,i) => {
                        const v = values[i];
                        sql += `${k}=${v}`;
                        if(i < keys.length - 1) {
                            sql += ', '
                        }
                    })
                    // Execute the insert SQL
                    sql = `UPDATE ${things} SET ${sql} WHERE id=${t.id};`;
                    console.log(sql)
                    db.executeSql(sql).then(([results]) => {
                        this.dg && console.log(`Updated ${results.rowsAffected} ${things}`);
                    }).catch(error => {
                        handleError(error)
                    })
                })
            })
        }
    };
    deleteAll(things) {
        /*
            Deleted all items of a specific kind.
            Input: String name of type of item
            to be deleted.
            Input: String name of things
            Output: Void
        */
        const sql = `DELETE FROM ${things};`;
        this.dg && console.log(`Deleting all ${things}\n`,sql);
        // Execute the delete SQL
        db.executeSql(sql).then(([results]) => {
            this.dg && console.log(`Deleted ${results.rowsAffected} ${things}`);
        }).catch(error => {
            handleError(error)
        })
    }
    get(things) {
        /*
            Queries database and returns all
            records of the specified type that match
            the specified criteria.
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
        this.dg && console.log(`Getting things`);
        const { all, where } = things;
        var result = [];
        var sql;
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
                this.dg && console.log(sql);
                this.dg && console.log(`Found ${results.rows.length} objects`);
                resolve(result)
            })
        )
    }
}