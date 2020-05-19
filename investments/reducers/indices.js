const INDEX_CREATE = 'INDEX_CREATE';

const initialState = [];

export const indices = function(state = initialState, action) {
  switch (action.type) {
    case INDEX_CREATE: {
      const ind = action.payload;
      return ind
    }
    default:
      return state
  }
  return state
}