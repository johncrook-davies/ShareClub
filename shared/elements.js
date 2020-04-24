import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

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

export const ImageAndText = (props) => {
    const { image, text } = props;
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
                    style={{ 
                        width: 48, 
                        height: 48,
                        borderWidth: 1,
                        borderRadius: 99
                    }}
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
                <Text>
                    { text }
                </Text>
            </View>
        </View>
    </>
}