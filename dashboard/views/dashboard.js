import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Appearance, useColorScheme } from 'react-native-appearance';

import {
  View,
  ScrollView,
  Image,
  Button,
  Section,
  P,
  Text,
  H1,
  H2,
  Currency,
  ImageAndText,
  Div,
  proposalShortText,
  Pie
} from '../../shared';

const setStyle = (cs, thing, other) => {color: 'red'}

const data = [1, 1, 2, 3, 5, 8, 13, 21];

const Dashboard = ({ clubs, invitations, proposals, db }) => {
  const cs = useColorScheme(); //'dark';//'light';
  return (
    <Div cs={cs}>
      <Section><H1>Welcome back</H1></Section>
      <ScrollView
        horizontal
        style={ setStyle(cs, 'clubs') }
        >
        <View flexDirection='row'>
          { clubs.map((c) =>
              <Club key={ c.id } cs = { cs } c={ c } />
            )}
        </View>
      </ScrollView>
      <Button 
        title='Test button'
        onPress={() => console.log("This works")}
        />
      <Section>
        <H2>Pending proposals</H2>
        <Placeholder cs={cs} things={'proposals'} number={proposals.length}/>
        {(proposals.length !== 0) && 
        <View style={ setStyle(cs, 'proposals') }>
          { proposals.map((p) =>
              <Proposal key={ p.id } p={p} cs={cs}/>
          )}
        </View>}
      </Section>
      <Section>
        <H2>Invitations</H2>
        <Placeholder cs={cs} things={'invitations'} number={invitations.length}/>
        {(invitations.length !== 0) && 
        <View>
          { invitations.map((i) =>
              <Invitation key={ i.id } i={i} cs={cs}/>
          )}
        </View>}
      </Section>
    </Div>
  )
}

const Placeholder = ({cs, things, number}) => {
  return (<>{
    (number === 0) && 
    <P 
      style={ setStyle(cs, 'placeholder') } 
     
      >
      {`You don't have any ${things} pending.`}
    </P>
  }</>)
}

const SmallImage = ({cs}) => <Image style={setStyle(cs,'outline',{ width: 48, height: 48, borderWidth: 1, borderRadius: 99 })} />

const Proposal = ({p,cs}) =>
  <ImageAndText 
    style={{marginBottom: 16, marginRight: 8, marginLeft: 8}}
    text={<P>{proposalShortText(p)}</P>}
    cs={cs}
    image={<SmallImage cs={cs}/>}
    />

const Invitation = ({i, cs}) =>
  <ImageAndText 
    style={{marginBottom: 16}}
    text={ <P>{`${i.name} has invited you to join the ${i.club}`}</P> }
    cs={cs}
    image={<SmallImage cs={cs}/>}
    />

const Club = ({ c, cs }) => 
  <View 
    alignItems='center'
    justifyContent='center'
    style={ setStyle(cs, 'club') }
    >
    <Pie
      width={260}
      height={260}
      data={data}
      />
    <Currency 
      adjustsFontSizeToFit
      numberOfLines={1}
      cs={ cs }
      style={ {fontFamily: 'Asap-Bold', fontSize: 40, position: 'absolute'} }
      >
      { c.value }
    </Currency>
    
  </View>

export default connect( 
  (state) => state, 
  {  } 
)(Dashboard)