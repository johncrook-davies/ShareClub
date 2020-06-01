const STOCK_CREATE = 'STOCK_CREATE';

const initialState = { all: [], bySymbol: {} };

export const stocks = function(state = initialState, action) {
  switch (action.type) {
    case STOCK_CREATE: {
      const stock = action.payload;
      return {
        all: [...state.all, stock],
        bySymbol: {
          ...state.bySymbol,
          [stock.symbol]: {
            ...stock
          }
        }
      }
    }
    default:
      return state
  }
  return state
}