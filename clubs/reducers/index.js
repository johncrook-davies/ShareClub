import { 
  CLUB_CREATE,
  CLUB_UPDATE,
  CLUB_DELETE,
} from "../actions/actionTypes";

const initialState = { all: [], byId: {} };;

export default function(state = initialState, action) {
  switch (action.type) {
    case CLUB_CREATE: {
      const club = action.payload;
      return {
        all: [...state.all, club],
        bySymbol: {
          ...state.byId,
          [club.id]: {
            ...club
          }
        }
      }
    }
    case CLUB_UPDATE: {
      const club = action.payload;
      return state.all.map(c => 
        c.id === club.id ? { ...club } : c
      )
    }
    case CLUB_DELETE: {
      const id = action.payload;
      return state.all.filter(c => 
        c.id !== id
      )
    }
    default:
      return state
  }
  return state
}