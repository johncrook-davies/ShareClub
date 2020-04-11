import { 
    ADD_CLUB, 
    UPDATE_CLUB, 
    CREATE_CONNECTION,
    DESTROY_CONNECTION
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