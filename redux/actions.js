import { 
  CREATE_CONNECTION,
  DESTROY_CONNECTION,
  INITIALISE_DB,
  TEAR_DOWN_DB,
  CLUB_CREATE,
  CLUB_UPDATE,
} from "./actionTypes";

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

export const tearDownDb = () => ({
  type: TEAR_DOWN_DB
})

export const clubCreate = club => ({
  type: CLUB_CREATE,
  payload: club
})

export const clubUpdate = club => ({
  type: CLUB_UPDATE,
  payload: club
})