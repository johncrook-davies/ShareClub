import { CLUB_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case CLUB_CREATE: {
      const clubs = action.payload;
      return clubs
    }
    default:
      return state
  }
  return state
}