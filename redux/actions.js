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

export const createDbConnection = db => ({
    type: CREATE_DB_CONNECTION,
    payload: {
        db
    }
})

export const destroyDbConnection = db => ({
    type: DESTROY_DB_CONNECTION,
    payload: {
      db: { db }
    }
});