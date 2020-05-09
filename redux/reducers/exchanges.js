import { EXCHANGE_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case EXCHANGE_CREATE: {
      const ex = action.payload;
      return ex
    }
    default:
      return state
  }
  return state
}