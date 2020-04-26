import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
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

export const ImageAndText = ({ image, text, cs, ...other }) => {
    return <>
        <View
            style={{
                flexDirection: 'row',
                marginBottom: 16,
                marginRight: 16,
                marginLeft: 16
            }}
            >
            <View 
                style={{
                    width: 48,
                }}
                source={ image }
                >
                <Image
                    style={setStyle(cs,'outline',{ 
                        width: 48, 
                        height: 48,
                        borderWidth: 1,
                        borderRadius: 99
                    })}
                    source={ image }
                    />
            </View>
            <View 
                style={{
                    paddingLeft: 16,
                    flexShrink: 1,
                    justifyContent: 'center'
                }}
                >
                <Text
                    style={setStyle(cs,'p')}
                    {...other}
                    >
                    { text }
                </Text>
            </View>
        </View>
    </>
}