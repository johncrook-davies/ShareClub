import { INDEX_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case INDEX_CREATE: {
      const ind = action.payload;
      return ind
    }
    default:
      return state
  }
  return state
}