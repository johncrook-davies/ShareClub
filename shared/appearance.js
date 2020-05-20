import { dark, light } from '../dashboard/views/styles';

export 
const setStyle = (cs, element, other) => {
    /*
        Selects and returns correct style for device appearence
        Input: 
            useColorScheme
            String element name
        Output StyleSheet object
    */
    if(typeof element !== 'string') {
        throw new Error('fn style -> input must be a string')
    }
    if(other === 'undefined') {
        return cs === 'dark' ? 
                dark[element] : 
                light[element]
    } else {
        return cs === 'dark' ? 
                { ...dark[element], ...other } : 
                { ...light[element], ...other }
    }
}