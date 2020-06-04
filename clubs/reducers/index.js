import { 
  CLUB_CREATE,
  CLUB_UPDATE,
  CLUB_DELETE,
} from "../actions/actionTypes";

const initialState = { all: [], byId: {} };

const exists = (record, state) => {
  if(typeof record !== 'object' || record === null){
    throw new Error("reducers -> exists -> record is not an object")
  }
  if(record.id === undefined){ return false }
  if(state.byId[record.id] === undefined){ return false }
  return true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLUB_CREATE: {
      const club = action.payload;
      if(exists(club,state)){return state}
      return {
        all: [...state.all, club],
        byId: {
          ...state.byId,
          [club.id]: {
            ...club
          }
        }
      }
    }
    case CLUB_UPDATE: {
      const club = action.payload;
      if(!exists(club,state)){return state}
      delete state.byId[club.id]
      return {
        all: state.all.map(c => 
          c.id === club.id ? { ...club } : c
        ),
        byId: {
          ...state.byId,
          [club.id]: {
            ...club
          }
        }
      }
    }
    case CLUB_DELETE: {
      const id = action.payload;
      if(!exists({id: id},state)){return state}
      return {
        all: state.all.filter(c => 
          c.id !== id
        ),
        byId: state.byId
      }
    }
    default:
      return state
  }
  return state
}