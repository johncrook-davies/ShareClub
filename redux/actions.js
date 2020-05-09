import { 
  ADD_CLUB, 
  UPDATE_CLUB, 
  INCREMENT_ASYNC,
  GET_CLUBS_FROM_DATABASE,
  DESTROY_CLUB,
  CREATE_CONNECTION,
  DESTROY_CONNECTION,
  CREATE_DB_CONNECTION,
  DESTROY_DB_CONNECTION
} from "./actionTypes";

export const incrementAsync = club => ({
  type: INCREMENT_ASYNC,
  club
});

export const getClubsFromDatabase = () => ({
  type: GET_CLUBS_FROM_DATABASE
});

export const addClub = club => ({
  type: ADD_CLUB,
  club
});

export const destroyClub = club => ({
  type: DESTROY_CLUB,
  club
});

export const updateClub = club => ({
  type: UPDATE_CLUB,
  club
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