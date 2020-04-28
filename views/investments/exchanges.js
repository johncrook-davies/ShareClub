import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Appearance, useColorScheme } from 'react-native-appearance';

import {
    View,
    Section,
    P,
    H1,
    H2,
    Div,
    Image,
    ImageAndText,
    setStyle
} from '../../shared';

const Exchanges = ({ navigation }) => {
    const cs = useColorScheme();
    return <Div cs={cs}>
        <Section>
            <StockSummary
                cs={ cs }
                />
        </Section>
        
    </Div>
}

const Stat = ({children, style, cs}) => {
    return(
        <P
            style={{
                marginBottom: 8,
                ...style
            }}
            cs={cs}
            >
            { children }
        </P>
    )
}

const StockSummary = ({cs, ...other}) => (
    <>
        <View
            style={{
                flexDirection: 'row'
            }}
            { ...other }
            >
            <View
                style={{
                    flex: 1
                }}
                >
                <ImageAndText
                    cs={cs}
                    text={<H2 cs={cs}>FTSE 100</H2>}
                    image={ <Icon cs={cs}/> }
                    onPress={() => navigation.navigate('...')}
                    />
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                <H2 cs={cs}>5,839.32</H2>
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row'
            }}
            >
            <View
                style={{
                    flex: 1
                }}
                >
                <Stat style={{paddingLeft: 64}}>First stat: </Stat>
                <Stat style={{paddingLeft: 64}}>Second stat:</Stat>
                <Stat style={{paddingLeft: 64}}>Third stat:</Stat>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                <Stat cs={cs}>{'0.86x'}</Stat>
                <Stat>{'5%'}</Stat>
                <Stat>{'1.054'}</Stat>
            </View>
        </View>
    </>
)

const Icon = ({cs}) => {
    return <Image 
            style={setStyle(cs,'outline',{ 
                width: 48, 
                height: 48, 
                borderWidth: 1, 
                borderRadius: 48 
            })} 
            />
}

const ExText = (props) => {
    const { name, price, cs } = props;
    return(
        <>
            <View
                style={setStyle(cs,'outline',{ 
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                })}
                >
                <H2 cs={cs}>{ name }</H2>
                <H2 cd={cs}>{ price }</H2>
            </View>
        </>
    )
}

export default Exchanges