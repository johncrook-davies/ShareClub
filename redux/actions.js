import { 
  ADD_CLUB, 
  UPDATE_CLUB,
  DESTROY_CLUB,
  CREATE_CONNECTION,
  DESTROY_CONNECTION,
  INITIALISE_DB,
  TEAR_DOWN_DB,
  CREATE_DB_CONNECTION,
  DESTROY_DB_CONNECTION
} from "./actionTypes";

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

export const initialiseDb = db => ({
  type: INITIALISE_DB,
  db
})

export const createDb = db => ({
  type: CREATE_DB,
  db: { db }
})

export const tearDownDb = () => ({
  type: TEAR_DOWN_DB
})

export const destroyDb = db => ({
  type: DESTROY_DB,
  payload: {
    db: { db }
  }
});