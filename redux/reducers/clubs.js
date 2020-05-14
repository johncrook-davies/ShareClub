import { 
  CLUB_CREATE,
  CLUB_UPDATE
} from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case CLUB_CREATE: {
      const clubs = action.payload;
      if(Array.isArray(clubs)) {
        return [
          ...state,
          ...clubs
        ]
      } else {
        let club = clubs;
        return [
          ...state,
          club
        ]
      }
    }
    case CLUB_UPDATE: {
      const club = action.payload;
      return state.map(c => 
        c.id === club.id ? { ...club } : c
      )
    }
    default:
      return state
  }
  return state
}