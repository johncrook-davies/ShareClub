export const getClubsState = store => store.clubs;
export const getProposalsState = store => store.proposals;
export const getInvitationsState = store => store.invitations;
export const getConnectionState = store => store.connections;

// Connection
export const getConnection = store =>
    getConnectionState(store) ? getConnectionState(store) : null;

// Clubs
export const getClubList = store =>
    getClubsState(store) ? getClubsState(store) : [];

// Proposals
export const getProposalsList = store =>
    getProposalsState(store) ? getProposalsState(store).all : [];
export const getProposalById = (store, id) =>
    getProposalsState(store) ? { ...getProposalsState(store).find[id], id } : {};
export const getProposalShortText = (store, id) => {
    const p = getProposalById(store, id),
          trades = p.trades,
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
    return `${p.user} proposes to ${actions}`
}

// Invitations
export const getInvitationsList = store =>
    getInvitationsState(store) ? getInvitationsState(store).all : [];
export const getInvitationById = (store, id) =>
    getInvitationsState(store) ? { ...getInvitationsState(store).find[id], id } : {};
export const getInvitationText = (store, id) => {
    const inv = getInvitationById(store, id);
    return `${inv.user} has invited you to join the ${inv.club}`
}