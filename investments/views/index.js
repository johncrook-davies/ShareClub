import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Stock from './stock';
import Types from './types';
import Indices from './indices';
import Index from './index_view';

const Stack = createStackNavigator();

const screens = [
  { title: 'Browse', component: Types },
  { title: 'Indices', component: Indices },
  { title: 'Index', component: Index },
  { title: 'Stock', component: Stock }
];

const Investments = ({ route }) => {
  return <Stack.Navigator>
    {
    screens.map((s) => (
      <Stack.Screen 
        name={s.title}
        key={s.title}
        component={s.component} 
        options={
          ({ route }) => ({ 
            title: route.params ? route.params.title : 'Investments',
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

export default Investments