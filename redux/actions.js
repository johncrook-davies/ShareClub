import { 
  CREATE_CONNECTION,
  DESTROY_CONNECTION,
  INITIALISE_DB,
  TEAR_DOWN_DB,
  INDEX_CREATE,
  GET_ALL_FROM_SERVER
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

export const getAllFromServer = () => ({
  type: GET_ALL_FROM_SERVER
})