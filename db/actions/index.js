export const INITIALISE_DB = 'INITIALISE_DB';
export const CREATE_DB = "CREATE_DB";
export const TEAR_DOWN_DB = 'TEAR_DOWN_DB';
export const DESTROY_DB = "DESTROY_DB";

export const initialiseDb = db => ({
  type: INITIALISE_DB,
  db
})

export const tearDownDb = () => ({
  type: TEAR_DOWN_DB
})