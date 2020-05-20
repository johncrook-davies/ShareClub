import { colours } from '../../shared';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  club: {
    height: 260,
    width: 260,
    marginLeft: 8,
    marginRight: 8,
  },
  clubBigText: {
    fontFamily: 'Asap-Bold', 
    fontSize: 40, 
    position: 'absolute',
    color: 'red'
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
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'red'
  },
  invitation: {
    marginBottom: 16
  },
  outline : {
    width: 48, 
    height: 48, 
    borderWidth: 1, 
    borderColor: 'red',
    borderRadius: 99
  },
})

export default styles;