import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme } from 'react-native-appearance';
import {
  View,
  Text,
  P,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  colours
} from '.';

export const Div = ({ children, ...other }) =>
  <SafeAreaView
    { ...other }
    >
    { children }
  </SafeAreaView>

export const Section = ({ children, style, ...other }) => {
  const styles = {
          marginLeft: 16,
          marginRight: 16,
          marginTop: 16,
          marginBottom: 16
        };
  return(
    <View style={ [style, styles] } { ...other }>
      { children }
    </View>
  )
}

export const ScrollableSection = ({ children, style, ...other }) => {
  const styles = {
          marginLeft: 16,
          marginRight: 16,
          marginTop: 16,
          marginBottom: 16
        };
  return(
    <ScrollView style={ [style, styles] } { ...other }>
      { children }
    </ScrollView>
  )
}

export const ImageAndText = ({ image, text, onPress, style, ...other }) => {
    let Comp;
    if(onPress !== undefined) {
        Comp = TouchableOpacity
    } else {
        Comp = View
    }
    return <>
        <Comp
            style={[
                style,
                {flexDirection: 'row'}
            ]}
            onPress={onPress}
            { ...other }
            >
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                >
                { image }
            </View>
            <View 
                style={{
                    paddingLeft: 16,
                    flexDirection: 'column',
                    flexShrink: 1,
                    justifyContent: 'center'
                }}
                >
                { text }
            </View>
        </Comp>
    </>
}

const Tab = createMaterialTopTabNavigator();

export const Tabs = ({screens, aboveTabs, stock}) => (
  <Tab.Navigator 
    tabBar={
      props => <TabBar aboveTabs={ aboveTabs } {...props} />
    }
    >
    {
      screens.map((s) => (
        <Tab.Screen name={s.name} key={s.name}>
          {() => s.component}
        </Tab.Screen> 
      ))
    }
  </Tab.Navigator>
)

const TabBar = ({ state, descriptors, navigation, position, aboveTabs }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <>
      { aboveTabs }
      <Section>
        <View 
          style={{ 
            flexDirection: 'row',
            marginTop: 16
          }}
          >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const inputRange = state.routes.map((_, i) => i);

            return (
              <>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                key={label}
                style={{ 
                  flex: 1,
                  alignItems: 'center',
                  borderBottomWidth: isFocused ? 1.5 : 0,
                  borderColor: isDark ? colours.dark.borderBottomColor : colours.light.borderBottomColor
                }}
              >
                <P
                  style={{
                    marginBottom: 8
                  }}
                  >
                  {label}
                </P>
              </TouchableOpacity>
              </>
            );
          })}
        </View>
      </Section>
    </>
  );
}