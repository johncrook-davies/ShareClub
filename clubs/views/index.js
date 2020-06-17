import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewClub from './new';

const Stack = createStackNavigator();

const screens = [
  { title: 'New', component: NewClub },
];

const Clubs = ({ route }) => {
  return <Stack.Navigator>
    {
    screens.map((s) => (
      <Stack.Screen 
        name={s.title}
        key={s.title}
        component={s.component} 
        options={
          ({ route }) => ({ 
            title: route.params ? route.params.title : 'Clubs',
            headerTitleStyle: {
              fontFamily: 'Asap-Bold',
            },
          })
        }
        />
    ))
    }
  </Stack.Navigator>
}

export default Clubs