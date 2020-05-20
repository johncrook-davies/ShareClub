import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

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
  Pie,
  makeStyledScreen
} from '../../shared';

import styles from './styles';

const data = [1, 1, 2, 3, 5, 8, 13, 21];

const Dashboard = ({ clubs, invitations, proposals, db }) => {
  return (
    <Div>
      <Section><H1>Welcome back</H1></Section>
      <ScrollView
        horizontal
        style={ styles.clubs }
        >
        <View flexDirection='row'>
          { clubs.map((c) =>
              <Club key={ c.id } c={ c } />
            )}
        </View>
      </ScrollView>
      <Button 
        title='Test button'
        onPress={() => console.log("This works")}
        />
      <Section>
        <H2>Pending proposals</H2>
        <Placeholder things={'proposals'} number={proposals.length}/>
        {(proposals.length !== 0) && 
        <View style={ styles.proposals }>
          { proposals.map((p) =>
              <Proposal key={ p.id } p={p}/>
          )}
        </View>}
      </Section>
      <Section>
        <H2>Invitations</H2>
        <Placeholder things={'invitations'} number={invitations.length}/>
        {(invitations.length !== 0) && 
        <View>
          { invitations.map((i) =>
              <Invitation key={ i.id } i={i} />
          )}
        </View>}
      </Section>
    </Div>
  )
}

const Placeholder = ({things, number}) => 
  <>{
    (number === 0) && 
    <P style={ styles.placeholder }>
      {`You don't have any ${things} pending.`}
    </P>
  }</>

const SmallImage = ({}) => <Image style={ styles.outline } />

const Proposal = ({ p }) =>
  <ImageAndText 
    style={ styles.proposal }
    text={<P>{proposalShortText(p)}</P>}
    image={<SmallImage/>}
    />

const Invitation = ({ i }) =>
  <ImageAndText 
    style={ styles.invitation }
    text={ <P>{`${i.name} has invited you to join the ${i.club}`}</P> }
    image={<SmallImage/>}
    />

const Club = ({ c }) => 
  <View 
    alignItems='center'
    justifyContent='center'
    style={ styles.club }
    >
    <Pie
      width={260}
      height={260}
      data={data}
      />
    <Currency 
      adjustsFontSizeToFit
      numberOfLines={1}
      style={ styles.clubBigText }
      >
      { c.value }
    </Currency>
    
  </View>

export default connect( 
  (state) => state, 
  {  } 
)(makeStyledScreen(Dashboard))