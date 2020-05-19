const EXCHANGE_CREATE = 'EXCHANGE_CREATE';

const initialState = [];

export const exchanges = function(state = initialState, action) {
  switch (action.type) {
    case EXCHANGE_CREATE: {
      const ex = action.payload;
      return ex
    }
    default:
      return state
  }
  return state
}