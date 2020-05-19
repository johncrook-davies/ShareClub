export const CREATE_CONNECTION = "CREATE_CONNECTION";
export const DESTROY_CONNECTION = "DESTROY_CONNECTION";

export const createConnection = () => ({
  type: CREATE_CONNECTION,
  payload: {}
});

export const destroyConnection = () => ({
  type: DESTROY_CONNECTION,
  payload: {}
});