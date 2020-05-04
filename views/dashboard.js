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

const Dashboard = (state) => {
  const [clubs, setClubs] = useState([]),
        [invitations, setInvitations] = useState([]),
        [proposals, setProposals] = useState([]),
        cs = useColorScheme(); //'dark';//'light';

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
    <Div cs={cs}>
      <Section>
        <H1 cs={cs}>Welcome back</H1>
      </Section>
      <ScrollView
        horizontal
        style={ setStyle(cs, 'clubs') }
        >
        <View
          flexDirection='row'
          >
          { clubs.map((c) =>{
            return(
              <Club 
                 cs = { cs }
                 key={ c.name }
                 name={ c.name } 
                 value={ c.value }
                 />
            )
          })}
        </View>
      </ScrollView>
      <Section>
        <H2 cs={cs}>Pending proposals</H2>
        {(proposals.length === 0) && <P style={ setStyle(cs, 'placeholder') } cs={cs}>You don't have any proposals pending.</P>}
        {(proposals.length !== 0) && 
        <View style={ setStyle(cs, 'proposals') }>
          { proposals.map((p) =>{
              return( 
                <ImageAndText 
                   key={ p.id }
                   style={{marginBottom: 16, marginRight: 8, marginLeft: 8}}
                   text={<P cs={cs}>{proposalShortText(p)}</P>}
                   cs={cs}
                   image={<Image style={setStyle(cs,'outline',{ width: 48, height: 48, borderWidth: 1, borderRadius: 99 })} />}
                   />
              )
          })}
        </View>}
      </Section>
      <Section>
        <H2 cs={cs}>Invitations</H2>
        {(invitations.length === 0) && <P style={ setStyle(cs, 'placeholder') } cs={cs}>You don't have any invitations pending.</P>}
        {(invitations.length !== 0) && 
        <View>
          { invitations.map((i) =>{
              return(
                <ImageAndText 
                   key={ i.id }
                   style={{marginBottom: 16}}
                    text={ <P cs={cs}>{`${i.name} has invited you to join the ${i.club}`}</P> }
                   cs={cs}
                   image={<Image style={setStyle(cs,'outline',{ width: 48, height: 48, borderWidth: 1, borderRadius: 99 })} />}
                   />
              )
          })}
        </View>}
      </Section>
    </Div>
  )
}

const Club = ({ cs, name, value }) => 
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
      { value }
    </Currency>
  </View>

export default connect( (state) => state, null )(Dashboard)