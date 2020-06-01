import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

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
  TouchableOpacity,
  proposalShortText,
  Pie,
  makeStyledScreen
} from '../../shared';

import { any, light, dark } from './styles';
import { user_light, user_dark } from '../../shared/assets/images';
import profile_dark from '../assets/images/profile_dark.png';
import profile_light from '../assets/images/profile_light.png';
import settings_dark from '../assets/images/settings_dark.png';
import settings_light from '../assets/images/settings_light.png';

const data = [1, 1, 2, 3, 5, 8, 13, 21];

const Dashboard = ({ clubs, invitations, proposals, db }) => {
  const appearance = useColorScheme() === 'dark' ? dark : light;
  return (
    <Div>
      <Section style={ any.topButtons } >
        <TouchableOpacity style={any.topButton}>
          <Image
            style={any.topButton}
            source={ 
              appearance === dark ? 
                profile_dark : 
                profile_light 
            }
            />
        </TouchableOpacity>
        <TouchableOpacity style={any.topButton}>
          <Image
            style={any.topButton}
            source={ 
              appearance === dark ? 
                settings_dark : 
                settings_light 
            }
            />
        </TouchableOpacity>
      </Section>
      <ScrollView
        horizontal
        style={ [any.clubs, appearance.clubs] }
        >
        <View flexDirection='row'>
          { clubs.all.map((c) =>
              <Club key={ 'club' + clubs.all.indexOf(c) } c={ c } appearance={ appearance } />
            )}
        </View>
      </ScrollView>
      <Section>
        <H2>Pending proposals</H2>
        <Placeholder 
          things={'proposals'} 
          number={proposals.all.length}
          appearance={ appearance }
          />
        {(proposals.all.length !== 0) && 
        <View style={ [any.proposals, appearance.proposals] }>
          { proposals.all.map((p) =>
              <Proposal key={ p.id + 'proposal' } p={p} appearance={ appearance }/>
          )}
        </View>}
      </Section>
      <Section>
        <H2>Invitations</H2>
        <Placeholder 
          things={'invitations'} 
          number={invitations.all.length}
          appearance={appearance}
          />
        {(invitations.all.length !== 0) && 
        <View>
          { invitations.all.map((i) =>
              <Invitation key={ i.id + 'invite' } i={i} appearance={ appearance } />
          )}
        </View>}
      </Section>
    </Div>
  )
}

const Placeholder = ({things, number, appearance}) => 
  <>{
    (number === 0) && 
    <P style={ [any.placeholder, appearance.placeholder] }>
      {`You don't have any ${things} pending.`}
    </P>
  }</>

const SmallImage = ({appearance}) => 
  <Image 
    style={ [any.outline, appearance.outline] } 
    source={ 
      appearance === dark ? 
        user_dark : 
        user_light 
    }
    />

const Proposal = ({ p, appearance }) =>
  <ImageAndText 
    style={ [any.proposal, appearance.proposal] }
    text={<P>{proposalShortText(p)}</P>}
    image={<SmallImage appearance={ appearance }/>}
    />

const Invitation = ({ i, appearance }) =>
  <ImageAndText 
    style={ [any.invitation, appearance.invitation] }
    text={ <P>{`${i.name} has invited you to join the ${i.club}`}</P> }
    image={<SmallImage appearance={ appearance }/>}
    />

const Club = ({ c, appearance }) => 
  <View 
    alignItems='center'
    justifyContent='center'
    style={ [any.club, appearance.club] }
    >
    <Pie
      width={260}
      height={260}
      data={data}
      />
    <Currency 
      adjustsFontSizeToFit
      numberOfLines={1}
      style={ [any.clubBigText, appearance.clubBigText] }
      >
      { c.value }
    </Currency>
    
  </View>

export default connect( 
  (state) => state, 
  {  } 
)(makeStyledScreen(Dashboard))