import { handleError } from '../errors';

function createTable(tx, tableName, attributes, dg) {
    dg && console.log(`Creating table ${tableName}`)
    tx.executeSql(`
        CREATE TABLE IF NOT EXISTS ${tableName}(
            ${attributes.join(',')}
        );
    `).catch((error) => {
        handleError(error)
    });
}
function updateTable(tx, tableName, new_attributes, old_attributes, dg) {
    const listOfColumns = [],
          commonColumns = new_attributes.filter(x => old_attributes.includes(x));
    var commaDelimitedListOfColumns;
    commonColumns.map((attr) => {
        listOfColumns.push(attr.slice(0,attr.indexOf(" ")))
    });
    commaDelimitedListOfColumns = listOfColumns.join(',');
    dg && console.log(`Changing table ${tableName}`)
    tx.executeSql(`PRAGMA foreign_keys=off;`);
    tx.executeSql(`BEGIN TRANSACTION;`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS new_${tableName}(
            ${new_attributes.join(',')}
    );`);
    tx.executeSql(`INSERT INTO new_${tableName}(${commaDelimitedListOfColumns}) SELECT ${commaDelimitedListOfColumns} FROM ${tableName};`);
    tx.executeSql(`DROP TABLE ${tableName};`);
    tx.executeSql(`ALTER TABLE new_${tableName} RENAME TO ${tableName};`);
    tx.executeSql(`COMMIT;`);
    tx.executeSql(`PRAGMA foreign_keys=on;`);    
}
function deleteTable(tx, tableName, dg) {
    dg && console.log(`Deleting table ${tableName}`)
    tx.executeSql(`
        DROP TABLE ${tableName};
    `).catch((error) => {
        handleError(error)
    });
}

function formatSchema(thing) {
    const schema_db = {};
    console.log(thing.rows.item(1))
    for(t=0; t<thing.rows.length; t++) {
        const table = thing.rows.item(t),
              createTableSql = table.sql,
              attributeText = createTableSql.slice(
                  createTableSql.indexOf("(")+1,
                  createTableSql.length-1
              );
        schema_db[table.name] = attributeText.split(',');
    }
    // Remove line breaks from schema
    for(const table in schema_db) {
        schema_db[table].forEach((s,i) => {
            schema_db[table][i] = s.replace(/^\s+|\s+$/g, '');
        })
    }
    return schema_db
}

export function migrate(tx, targetSchema, dg) {
    const version = targetSchema.version,
          targetSchemaWithVersion = targetSchema;
    targetSchemaWithVersion['version'] = ['id INTEGER PRIMARY KEY NOT NULL', `version INTEGER`];
    // Remove line breaks from target schema
    for(const table in targetSchemaWithVersion) {
        targetSchemaWithVersion[table].forEach((s,i) => {
            targetSchemaWithVersion[table][i] = s.replace(/^\s+|\s+$/g, '');
        })
    }
    dg && console.log(`Migrating ${tx.dbname}`)
    tx.executeSql("SELECT name, sql FROM sqlite_master;").then(([thing]) => {
        const schema_db = {};
        for(t=0; t<thing.rows.length; t++) {
            const table = thing.rows.item(t),
                  createTableSql = table.sql,
                  attributeText = createTableSql.slice(
                      createTableSql.indexOf("(")+1,
                      createTableSql.length-1
                  );
            schema_db[table.name] = attributeText.split(',');
        }
        // Remove line breaks from current schema
        for(const table in schema_db) {
            schema_db[table].forEach((s,i) => {
                schema_db[table][i] = s.replace(/^\s+|\s+$/g, '');
            })
        }
        dg && console.log(`The schema in the current database is:`,schema_db);
        dg && console.log(`The target schema is:`,targetSchemaWithVersion);
        Object.keys(targetSchemaWithVersion).map((t) => {
            if(schema_db[t] === undefined){
                createTable(tx, t, targetSchemaWithVersion[t], dg)
            } else {
                updateTable(tx, t, targetSchemaWithVersion[t], schema_db[t], dg)
            }
        })
        Object.keys(schema_db).map((t) => {
            if(targetSchemaWithVersion[t] === undefined){
                deleteTable(tx, t, dg)
            }
        })
    }).then(() => {
      tx.executeSql(`SELECT * FROM version;`).then(([v]) => {
        if(v.rows.length === 0) {
          let sql = `INSERT INTO version(id,version) VALUES (1,${version});`;
          dg && console.log(`No version record in version database`,sql)
          tx.executeSql(sql).then(([results]) => {
              dg && console.log(`Version of database update to ${version} `)
          }).catch((error) => {
              handleError(error);
          })
        } else {
          tx.executeSql(`UPDATE version SET version=${version} WHERE id=1;`).then(([results]) => {
              dg && console.log(`Version of database update to ${version} `)
          }).catch((error) => {
              handleError(error);
          })
        }
      })
        
    }).then(() => {
        dg && tx.executeSql("SELECT name, sql FROM sqlite_master;").then(([results]) => {console.log(`Changed schema to`, formatSchema(results))})
    }).catch((error) => {
        console.log(`the thing didn't work`);
    });
}