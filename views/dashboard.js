import React from 'react';
import { connect } from "react-redux";

import colours from '../shared/colours';

import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView
} from 'react-native';

//const mapStateToProps = state => {
//    const clubs = getClubList(state),
//          unformattedProposals = getProposalsList(state),
//          unformattedInvitations = getInvitationsList(state),
//          proposals = [],
//          invitations = [];
//    unformattedProposals.map((p) => proposals.push({
//        id: p.id,
//        text: getProposalShortText(state, p.id)
//    }))
//    unformattedInvitations.map((i) => invitations.push({
//        id: i.id,
//        text: getInvitationText(state, i.id)
//    }))
//    return { clubs, proposals, invitations }
//}

const mapDbToProps = async db => {
//    const stocks = await db.get({all: 'stocks'});
//    return stocks
    console.log(db)
}

const Dashboard = ({ clubs, proposals, invitations, connection, db }) => {
    console.log(db)
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
                    { [].map((p) =>{
                        return <ImageAndText 
                                   key={ p.id }
                                   text={ p.text }
                                   />
                    })}
                </View>}
            </Section>
            <Section>
                <H2>Invitations</H2>
                {(invitations.length === 0) && <Text style={styles.placeholder}>You don't have any invitations pending.</Text>}
                {(invitations.length !== 0) && 
                <View>
                    { [].map((i) =>{
                        return <ImageAndText 
                                   key={ i.id }
                                   text={ i.text }
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
        <Text 
            adjustsFontSizeToFit
            numberOfLines={1}
            style={ styles.clubValue }
            >
            { formatAsCurrency(value) }
        </Text>
    </View>
}

const ImageAndText = props => {
    const { image, text } = props;
    return <>
        <View
            style={{
                flexDirection: 'row',
                marginBottom: 16,
                marginRight: 16,
                marginLeft: 16
            }}
            >
            <View 
                style={{
                    width: 48,
                }}
                source={ image }
                >
                <Image
                    style={{ 
                        width: 48, 
                        height: 48,
                        borderWidth: 1,
                        borderRadius: 99
                    }}
                    source={ image }
                    />
            </View>
            <View 
                style={{
                    paddingLeft: 16,
                    flexShrink: 1,
                    justifyContent: 'center'
                }}
                >
                <Text>
                    { text }
                </Text>
            </View>
        </View>
    </>
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

const H1 = (props) => {
    const { children } = props,
          styles = {
              fontSize: 35
          };
    return(
        <Text style={styles}>{ children }</Text>
    )
}
const H2 = (props) => {
    const { children } = props,
          styles = {
              fontSize: 19,
              marginBottom: 16
          };
    return(
        <Text style={styles}>{ children }</Text>
    )
}

const formatAsCurrency = (n) => {
    const roundedN = Math.round(n*100)/100;
    var stringN = String(roundedN),
        splitStringN,
        stringLength,
        i = 0;
    // Add decimal points for integers
    Number.isInteger(n) ? stringN += '.00' : null;
    splitStringN = stringN.split('');
    stringLength = splitStringN.length - 1;
    // Add commas for thousand separators
    stringN = '';
    splitStringN.reverse().map((s)=>{
        if( i <= 3 ){
            stringN += s;
        } else if( i % 3 === 0 ) {
            stringN += `,${s}`;
        } else {
            stringN += s;
        }
        i ++;
    })
    return `£${stringN.split('').reverse().join('')}`
}

const Section = (props) => {
    const { children } = props,
          styles = {
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 32
          };
    return(
        <View style={ styles }>{ children }</View>
    )
}

export default connect((state) => state)(Dashboard)