export const getStocksForIndex = (state, ind) => {
  const i = state.indices.bySymbol[ind],
        indexStockSyms = i.stocks,
        allStocks = state.stocks.all,
        stocks = allStocks.filter((x) => indexStockSyms.includes(x.symbol));
  return stocks
}