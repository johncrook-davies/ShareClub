import { PROPOSAL_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case PROPOSAL_CREATE: {
      const proposal = action.payload;
      return proposal
    }
    default:
      return state
  }
  return state
}