import { 
  CREATE_CONNECTION,
  DESTROY_CONNECTION,
  INITIALISE_DB,
  TEAR_DOWN_DB,
  INDEX_CREATE,
  GET_INDICES_FROM_SERVER
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

export const getIndicesFromServer = () => ({
  type: GET_INDICES_FROM_SERVER
})