import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

let db;

function databaseInitialisation(db, schema) {
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)');
    })
        .then(() => {})
        .catch(error => handleError(error));
}

function handleError(error) {
    console.log(error)
}

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