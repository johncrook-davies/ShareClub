import SQLite from "react-native-sqlite-storage";
import { migrate } from './migrate';
import { handleError } from './errors';

SQLite.enablePromise(true);
let db;

export default class syncroniser {
    constructor(props, debug){
        this.props = props;
        this.dg = debug;
        //SQLite.DEBUG(debug); // Uncomment to allow sqlite debug info
    }
    initDb() {
        /*
            Performs an echotest to ensure that 
            the SQLite library is present. If so
            it opens the database. It checks the 
            version of the database against the 
            current version of the schema. If the
            versions are different then it performs
            a migration.
        */
        const { database, size, schema } = this.props;
        const { version } = schema;
        SQLite.echoTest().then(() => {
            // Open database
            SQLite.openDatabase(
                database,
                version,
                "Offline database",
                size
            ).then((DB) => {
                db = DB
                this.dg && console.log("Database OPENED");
                // Check database version and if different migrate
                db.executeSql('SELECT version FROM version WHERE version_id=1;').then(([v]) =>{
                    this.dg && console.log(`Current database version is`,v.rows.item(0).version)
                    this.dg && console.log(`Schema version is`,version)
                    if(v.rows.item(0).version !== version){
                        migrate(db, schema, this.dg)
                    } else {
                        this.dg && console.log(`No migration required`)
                    }
                })
                //---------- TEST ---------------
                this.deleteAll('invitations')
                this.create({invitations: [
                    {
                        user: 'Tess Yellanda',
                        club: 'Original Pirate Investors'
                    }
                ]})
                //-----------------------------
            }).catch(error => handleError(error));
        }).catch(error => handleError(error));
        
    };
    close() {
        /*
            Checks if the database is non-null
            If it is then close it otherwise 
            log a message
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
            Output: Void
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
}