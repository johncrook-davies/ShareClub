import { STOCK_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case STOCK_CREATE: {
      const stock = action.payload;
      return stock
    }
    default:
      return state
  }
  return state
}