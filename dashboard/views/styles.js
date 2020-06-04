import { colours } from '../../shared';
import { StyleSheet } from 'react-native';

export const any = StyleSheet.create({
  topButtons: {
    height: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    width: 16,
    height: 16,
  },
  club: {
    height: 260,
    width: 260,
    marginLeft: 8,
    marginRight: 8,
  },
  clubs: {
    marginBottom: 32
  },
  placeholder : {
    marginLeft: 16,
    marginRight: 16
  },
  proposal: {
    marginBottom: 16, 
    marginRight: 8, 
    marginLeft: 8
  },
  proposals: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
  },
  invitation: {
    marginBottom: 16
  },
  outline : {
    width: 48, 
    height: 48,
  },
})

export const light = StyleSheet.create({
  proposals: {
    backgroundColor: colours.light.background,
    borderRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
})

export const dark = StyleSheet.create({
  proposals: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colours.dark.borderColor,
  },
})