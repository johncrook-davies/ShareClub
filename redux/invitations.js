const INVITATION_CREATE ='INVITATION_CREATE';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case INVITATION_CREATE: {
      const invitation = action.payload;
      return invitation
    }
    default:
      return state
  }
  return state
}