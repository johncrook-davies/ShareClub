const STOCK_CREATE = 'STOCK_CREATE';
const STOCKS_CREATE_ALL = 'STOCKS_CREATE_ALL';

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
    case STOCKS_CREATE_ALL: {
      const stocks = action.payload;
      let bySymbol = {};
      stocks.map((s) => {bySymbol[s.symbol] = s})
      return {
        all: stocks,
        bySymbol: bySymbol
      }
    }
    default:
      return state
  }
  return state
}