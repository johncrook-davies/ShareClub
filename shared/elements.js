import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    setStyle,
    Image
} from '.';

export const Div = ({ children, cs, styles, ...other }) => {
    return <SafeAreaView
        style={ setStyle(cs,'div', styles)}
        { ...other }
        >
        { children }
    </SafeAreaView>
}

export const Section = ({ children, ...other }) => {
    const styles = {
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 32
          };
    return(
        <View style={ styles } { ...other }>
            { children }
        </View>
    )
}

export const ImageAndText = ({ image, text, cs, onPress, ...other }) => {
    let Comp;
    if(onPress !== undefined) {
        Comp = TouchableOpacity
    } else {
        Comp = View
    }
    return <>
        <Comp
            style={{
                flexDirection: 'row',
                marginBottom: 16,
                marginRight: 16,
                marginLeft: 16
            }}
            onPress={onPress}
            { ...other }
            >
            <View>
                { image }
            </View>
            <View 
                style={{
                    paddingLeft: 16,
                    flexShrink: 1,
                    justifyContent: 'center'
                }}
                >
                { text }
            </View>
        </Comp>
    </>
}