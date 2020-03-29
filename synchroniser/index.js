import SQLite from "react-native-sqlite-storage";

import { migrate } from './migrate';
import { handleError } from './errors';

SQLite.enablePromise(true);

let db;

export default class syncroniser {
    constructor(props, debug){
        this.props = props;
        this.dg = debug;
        SQLite.DEBUG(debug);
    }
    initDb() {
        const { database, size, schema } = this.props;
        const { version } = schema;
        SQLite.echoTest().then(() => {
            SQLite.openDatabase(
                database,
                version,
                "Offline database",
                size
            ).then((DB) => {
                db = DB
                this.dg && console.log("Database OPENED");
                // Check database version and if diff migrate
                db.executeSql('SELECT version FROM version WHERE version_id=1;').then(([v]) =>{
                    this.dg && console.log(`Current database version is`,v.rows.item(0).version)
                    this.dg && console.log(`Schema version is`,version)
                    if(v.rows.item(0).version !== version){
                        migrate(db, schema, this.dg)
                    } else {
                        this.dg && console.log(`No migration required`)
                    }
                    
                    
                })
            }).catch(error => handleError(error));
        }).catch(error => handleError(error));
    };
    close() {
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
}