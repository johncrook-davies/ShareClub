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
                db.executeSql('SELECT version FROM version WHERE version_id=1;').then(([v]) =>{
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
                var values = Object.values(thing);
                // Ensure string values are enclosed by speach marks
                values.forEach((v,i) => {
                    if(typeof v === 'string'){
                        values[i] = "'"+v+"'"
                    }
                })
                // Create a comma delimited string of values
                values = values.join(',');
                // Execute the insert SQL
                db.executeSql(`INSERT INTO ${things}(${keys}) VALUES (${values});`).then(([results]) => {
                    this.dg && console.log(`Created ${results.rowsAffected} new ${things}`);
                }).catch(error => {
                    handleError(error)
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
        this.dg && console.log(`Deleting all ${things}`);
        // Execute the delete SQL
        db.executeSql(`DELETE FROM ${things};`).then(([results]) => {
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
        var queryString;
        // Construct query string
        queryString = `SELECT * FROM ${all};`
        if(where !== undefined) {
            queryString += ` WHERE`
            Object.keys(where).forEach((c,i) => {
                if(where[c].isEqualto !== undefined) {
                    const criteria = (typeof where[c].isEqualto === 'string') ? ("'"+where[c].isEqualto+"'") : where[c].isEqualto;
                    (i > 0) && (queryString += ' AND')
                    queryString += ` ${c}=${criteria}`   
                } else if(where[c].isGreaterThan !== undefined) {
                    const criteria = (typeof where[c].isGreaterThan === 'string') ? ("'"+where[c].isGreaterThan+"'") : where[c].isGreaterThan;
                    (i > 0) && (queryString += ' AND')
                    queryString += ` ${c}>${criteria}`
                } else if(where[c].isLessThan !== undefined) {
                    const criteria = (typeof where[c].isLessThan === 'string') ? ("'"+where[c].isLessThan+"'") : where[c].isLessThan;
                    (i > 0) && (queryString += ' AND')
                    queryString += ` ${c}<${criteria}`
                }
            })
        }
        queryString += ';';
        // Execute the SQL
        return new Promise((resolve, reject) =>
            db.executeSql(queryString).then(([results]) => {
                this.dg && console.log("Executing query: ", queryString);
                for(let i=0; i<results.rows.length; i++) {
                    result.push(results.rows.item(i))
                }
                resolve(result)
            }).catch(error => {
                handleError(error)
            })
        )
    }
}