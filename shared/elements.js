import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image
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