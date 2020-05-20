import { colours } from '../../shared';
import { StyleSheet } from 'react-native';

export const dark = StyleSheet.create({
    div: {
        backgroundColor: colours.dark.background
    },
    p: {
        color: colours.dark.color
    },
    h1: {
        color: colours.dark.color
    },
    h2: {
        color: colours.dark.color
    },
    currency: {
        color: colours.dark.color
    },
    placeholder : {
        marginLeft: 16,
        marginRight: 16
    },
    outline : {
        borderColor: colours.dark.borderColor
    },
    clubs: {
        marginBottom: 32
    },
    club: {
        height: 260,
        width: 260,
        marginLeft: 8,
        marginRight: 8,
    },
    proposals: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colours.dark.borderColor
    },
    invitation: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16
    } 
});

export const light = StyleSheet.create({
    div: {
        backgroundColor: colours.light.background
    },
    p: {
        color: colours.light.color
    },
    h1: {
        color: colours.light.color
    },
    h2: {
        color: colours.light.color
    },
    currency: {
        color: colours.light.color
    },
    placeholder : {
        marginLeft: 16,
        marginRight: 16
    },
    outline : {
        borderColor: colours.light.borderColor
    },
    clubs: {
        marginBottom: 32
    },
    club: {
        height: 260,
        width: 260,
        marginLeft: 8,
        marginRight: 8,
    },
    proposals: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colours.light.borderColor
    },
    invitation: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16
    } 
});