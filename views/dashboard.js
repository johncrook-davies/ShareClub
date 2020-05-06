import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Appearance, useColorScheme } from 'react-native-appearance';

import {
  View,
  ScrollView,
  Image,
  Section,
  P,
  H1,
  H2,
  Currency,
  ImageAndText,
  Div,
  setStyle,
  proposalShortText
} from '../shared';

const Dashboard = ({ db }) => {
  const [clubs, setClubs] = useState([]),
        [invitations, setInvitations] = useState([]),
        [proposals, setProposals] = useState([]),
        cs = useColorScheme(); //'dark';//'light';

  // Load data from database on initialisation
  useEffect(() => {
    if(db.readyState === 'ready') {
      db.call.get({all: 'clubs'})
        .then((r)=> setClubs(r))
      db.call.get({all: 'invitations'})
        .then((r)=> setInvitations(r))
      db.call.get({all: 'proposals'})
        .then((r)=> setProposals(r))
    }
  },[db.readyState])

  return (
    <Div cs={cs}>
      <Section><H1 cs={cs}>Welcome back</H1></Section>
      <ScrollView
        horizontal
        style={ setStyle(cs, 'clubs') }
        >
        <View flexDirection='row'>
          { clubs.map((c) =>
              <Club cs = { cs } c={ c } />
            )}
        </View>
      </ScrollView>
      <Section>
        <H2 cs={cs}>Pending proposals</H2>
        {(proposals.length === 0) && <P style={ setStyle(cs, 'placeholder') } cs={cs}>You don't have any proposals pending.</P>}
        {(proposals.length !== 0) && 
        <View style={ setStyle(cs, 'proposals') }>
          { proposals.map((p) =>
              <Proposal p={p} cs={cs}/>
          )}
        </View>}
      </Section>
      <Section>
        <H2 cs={cs}>Invitations</H2>
        {(invitations.length === 0) && <P style={ setStyle(cs, 'placeholder') } cs={cs}>You don't have any invitations pending.</P>}
        {(invitations.length !== 0) && 
        <View>
          { invitations.map((i) =>
              <Invitation
                i={i}
                cs={cs}
                />
          )}
        </View>}
      </Section>
    </Div>
  )
}

const SmallImage = ({cs}) => <Image style={setStyle(cs,'outline',{ width: 48, height: 48, borderWidth: 1, borderRadius: 99 })} />

const Proposal = ({p,cs}) =>
  <ImageAndText 
    key={ p.id }
    style={{marginBottom: 16, marginRight: 8, marginLeft: 8}}
    text={<P cs={cs}>{proposalShortText(p)}</P>}
    cs={cs}
    image={<SmallImage cs={cs}/>}
    />

const Invitation = ({i, cs}) =>
  <ImageAndText 
    key={ i.id + i.name }
    style={{marginBottom: 16}}
    text={ <P cs={cs}>{`${i.name} has invited you to join the ${i.club}`}</P> }
    cs={cs}
    image={<SmallImage cs={cs}/>}
    />

const Club = ({ c, cs }) => 
  <View 
    alignItems='center'
    justifyContent='center'
    style={ setStyle(cs, 'club') }
    >
    <Currency 
      adjustsFontSizeToFit
      numberOfLines={1}
      cs={ cs }
      styles={ {fontSize: 40} }
      >
      { c.value }
    </Currency>
  </View>

export default connect( (state) => state, null )(Dashboard)