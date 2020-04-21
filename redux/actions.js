import Synchroniser from '../synchroniser';
import { schema } from '../schema';
import seedDatabase from '../seeds';
import { syncWithDatabase } from '../sync_with_server';

import { 
    ADD_CLUB, 
    UPDATE_CLUB, 
    CREATE_CONNECTION,
    DESTROY_CONNECTION,
    CREATE_DB_CONNECTION,
    DESTROY_DB_CONNECTION
} from "./actionTypes";

export const addClub = content => ({
  type: ADD_CLUB,
  payload: {}
});

export const updateClub = id => ({
  type: UPDATE_CLUB,
  payload: {}
});

export const createConnection = () => ({
  type: CREATE_CONNECTION,
  payload: {}
});

export const destroyConnection = () => ({
  type: DESTROY_CONNECTION,
  payload: {}
});

export const initDbConnection = () => {
        const syncdb = new Synchroniser({
            database: "offlineDatabase.db",
            size: 200000,
            schema: schema
        },
        true);
        return dispatch => {
            return syncdb.initDb()
                .then(() => {
                    __DEV__ ? seedDatabase(syncdb) : null;
                    syncWithDatabase(syncdb)
                dispatch(createDbConnection(syncdb))
                })
                .catch(() => {
                    throw new Error('Could not initialise database')
                })
        }
};

export const createDbConnection = db => {
    return {
        type: CREATE_DB_CONNECTION,
        payload: {
            db
        }
    }
};

export const destroyDbConnection = db => ({
  type: DESTROY_DB_CONNECTION,
  payload: {
      db: { db }
  }
});