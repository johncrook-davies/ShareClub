import { 
  CREATE_DB, 
  DESTROY_DB 
} from "../actionTypes";

const initialState = {
  readyState: 'initialising',
  call: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_DB: {
      const db = action.payload;
      return {
        readyState: 'ready',
        call: db
      }
    }
    case DESTROY_DB: {
      return {
        readyState: 'closed',
        call: null
      }
    }
    default:
      return state
  }
  return state
}