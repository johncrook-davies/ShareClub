const INDEX_CREATE = 'INDEX_CREATE';

const initialState = { all: [], bySymbol: {} };

export const indices = function(state = initialState, action) {
  switch (action.type) {
    case INDEX_CREATE: {
      const ind = action.payload;
      return {
        all: [...state.all, ind],
        bySymbol: {
          ...state.bySymbol,
          [ind.symbol]: {
            ...ind
          }
        }
      }
    }
    default:
      return state
  }
  return state
}