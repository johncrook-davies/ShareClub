const INDEX_CREATE = 'INDEX_CREATE';

const initialState = { all: [], bySymbol: {} };

const exists = (record, state) => {
  if(typeof record !== 'object' || record === null){
    throw new Error("reducers -> exists -> record is not an object")
  }
  if(record.symbol === undefined){ return false }
  if(state.bySymbol[record.symbol] === undefined){ return false }
  return true
}

export const indices = function(state = initialState, action) {
  switch (action.type) {
    case INDEX_CREATE: {
      const ind = action.payload;
      if(exists(ind,state)){return state}
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