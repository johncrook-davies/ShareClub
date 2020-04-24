import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { 
    colours,
    H1,
    H2,
    Currency,
    Section,
    ImageAndText
} from '../shared';

import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView
} from 'react-native';

const Dashboard = (state) => {
    const [clubs, setClubs] = useState([]),
          [invitations, setInvitations] = useState([]),
          [proposals, setProposals] = useState([]);
    
    // Load data from database on initialisation
    useEffect(() => {
        if(state.db.readyState === 'ready') {
            state.db.call.get({all: 'clubs'})
                .then((r)=> setClubs(r))
            state.db.call.get({all: 'invitations'})
                .then((r)=> setInvitations(r))
            state.db.call.get({all: 'proposals'})
                .then((r)=> setProposals(r))
        }
    },[state.db.readyState])
    
    return (
        <SafeAreaView>
            <Section>
                <H1>Welcome back</H1>
            </Section>
            <ScrollView
                horizontal
                style={ styles.clubs }
                >
                <View
                    flexDirection='row'
                    >
                    { clubs.map((c) =>{
                        return <Club 
                                   key={ c.name }
                                   name={ c.name } 
                                   value={ c.value }
                                   />
                    })}
                </View>
            </ScrollView>
            <Section>
                <H2>Pending proposals</H2>
                {(proposals.length === 0) && <Text style={styles.placeholder}>You don't have any proposals pending.</Text>}
                {(proposals.length !== 0) && 
                <View style={ styles.proposals }>
                    { proposals.map((p) =>{
                        return <ImageAndText 
                                   key={ p.id }
                                   text={proposalShortText(p)}
                                   />
                    })}
                </View>}
            </Section>
            <Section>
                <H2>Invitations</H2>
                {(invitations.length === 0) && <Text style={styles.placeholder}>You don't have any invitations pending.</Text>}
                {(invitations.length !== 0) && 
                <View>
                    { invitations.map((i) =>{
                        return <ImageAndText 
                                   key={ i.id }
                                   text={ `${i.name} has invited you to join the ${i.club}` }
                                   />
                    })}
                </View>}
            </Section>
        </SafeAreaView>
    )
}

const Club = (props) => {
    const { name, value } = props;
    return <View 
               alignItems='center'
               justifyContent='center'
               style={ styles.club }
               >
        <Currency 
            adjustsFontSizeToFit
            numberOfLines={1}
            style={ styles.clubValue }
            >
            { value }
        </Currency>
    </View>
}

const proposalShortText = (p) => {
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

const styles = StyleSheet.create({
    placeholder : {
        marginLeft: 16,
        marginRight: 16
    },
    clubs: {
        marginBottom: 32
    },
    club: {
        height: 260,
        width: 260,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 1
    },
    clubValue: {
        fontSize: 40 
    },
    proposals: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        borderWidth: 1,
        borderRadius: 4
    },
    invitation: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16
    }
});



export default connect(
    (state) => state,
    null
)(Dashboard)