const PROPOSAL_CREATE ='PROPOSAL_CREATE';
const PROPOSAL_UPDATE ='PROPOSAL_UPDATE';
const PROPOSAL_DELETE ='PROPOSAL_DELETE';

const initialState = { all: [], byId: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case PROPOSAL_CREATE: {
      const proposal = action.payload;
      return {
        all: [...state.all, proposal],
        byId: {
          ...state.byId,
          [proposal.id]: {
            ...proposal
          }
        }
      }
    }
    case PROPOSAL_UPDATE: {
      const proposal = action.payload;
      delete state.byId[proposal.id]
      return {
        all: state.all.map(c => 
          c.id === proposal.id ? { ...proposal } : c
        ),
        byId: {
          ...state.byId,
          [proposal.id]: {
            ...proposal
          }
        }
      }
    }
    case PROPOSAL_DELETE: {
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