export const proposalShortText = (p) => {
    const trades = JSON.parse(p.trades),
          l = trades.length,
          n = trades[l - 1].symbol === 'CASH' ? l - 2 : l - 1;
    var actions = '';
    trades.map(t => {
        i = trades.indexOf(t);
        switch(i) {
            case 0: {
                null
                break;
            }
            case n: {
                actions += ' and '
                break;
            }
            default:
                actions += ', '
                break;
        }
        if(t.symbol === 'CASH' && t.type === 'sell') {
            return actions += 'funded from cash'
        } else if (t.symbol === 'CASH' && t.type === 'buy') {
            return actions += 'and then keep as cash'
        }
        return actions += `${t.type} ${Math.abs(t.value)} of ${t.symbol}`
    })
    return `${p.name} proposes to ${actions}`
}