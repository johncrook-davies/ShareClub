const INVITATION_CREATE ='INVITATION_CREATE';
const INVITATION_UPDATE ='INVITATION_UPDATE';
const INVITATION_DELETE ='INVITATION_DELETE';

const initialState = { all: [], byId: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case INVITATION_CREATE: {
      const invitation = action.payload;
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