import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Appearance, useColorScheme } from 'react-native-appearance';

import {
    View,
    TouchableOpacity,
    Section,
    P,
    H1,
    H2,
    Div,
    Image,
    Currency,
    ImageAndText,
    setStyle
} from '../../shared';

const Indices = (state, { navigation }) => {
    const cs = useColorScheme(),
          [indices, setIndices] = useState([]);
    // Load data from database on initialisation
    useEffect(() => {
        if(state.db.readyState === 'ready') {
            state.db.call.get({all: 'indices'})
                .then((r)=> setIndices(r))
        }
    },[state.db.readyState])
    
    return <Div cs={cs}>
        <Section>
            <ListOfIndices 
                cs={ cs }
                indices={ indices }
                />
        </Section>
        
    </Div>
}

const ListOfIndices = ({cs, indices}) => <>
    {
        indices.map((i) => {
            return(
                <StockSummary
                    cs={ cs }
                    key={i.name}
                    name={i.name}
                    price={i.latest_price}
                    />
            )
        })
    }
</>

const Stat = ({children, style, cs}) => 
    <P
        style={{marginBottom: 8, ...style}}
        cs={cs}
        >
        { children }
    </P>

const StockSummary = ({cs, name, price, ...other}) => 
    <TouchableOpacity>
        <View 
            style={{flexDirection: 'row'}}
            { ...other }
            >
            <View style={{flex: 1}}>
                <ImageAndText
                    cs={cs}
                    text={<H2 cs={cs}>{name}</H2>}
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
                <H2 cs={cs}>
                    <Currency>{price}</Currency>
                </H2>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
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
    </TouchableOpacity>

const Icon = ({cs}) =>
    <Image 
        style={setStyle(cs,'outline',{ 
            width: 48, 
            height: 48, 
            borderWidth: 1, 
            borderRadius: 48 
        })} 
        />

const ExText = ({ name, price, cs }) =>
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

export default connect( (state) => state, null )(Indices)