const INVITATION_CREATE ='INVITATION_CREATE';
const INVITATION_UPDATE ='INVITATION_UPDATE';
const INVITATION_DELETE ='INVITATION_DELETE';

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
    case INVITATION_CREATE: {
      const invitation = action.payload;
      if(exists(invitation,state)){return state}
      return {
        all: [...state.all, invitation],
        byId: {
          ...state.byId,
          [invitation.id]: {
            ...invitation
          }
        }
      }
    }
    case INVITATION_UPDATE: {
      const invitation = action.payload;
      if(!exists(invitation,state)){return state}
      delete state.byId[invitation.id]
      return {
        all: state.all.map(c => 
          c.id === invitation.id ? { ...invitation } : c
        ),
        byId: {
          ...state.byId,
          [invitation.id]: {
            ...invitation
          }
        }
      }
    }
    case INVITATION_DELETE: {
      const id = action.payload;
      if(!exists({id: id},state)){return state}
      delete state.byId[id]
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