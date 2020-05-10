import { STOCK_CREATE } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case STOCK_CREATE: {
      const arrayOfStocks = action.payload;
      let result = {bySymbol: {}};
      arrayOfStocks.map((s) => {
        result['bySymbol'][s.symbol] = s
      })
      return result
    }
    default:
      return state
  }
  return state
}