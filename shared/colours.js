const purple = '#2A1E5C',
      lightPurple = '#F0EDFF',
      red = '#FE5F55',
      green = '#5EB1BF',
      yellow = '#F0A202',
      darkGrey = '#323031',
      black = '#000000',
      white = '#FFFFFF',
      darkBlue = '#1A1728';

export const colours = {
  light: {
    navBarBackground: purple,
    navBarBorder: 'transparent',
    navBarText: white,
    navBarActive: white,
    navBarInactive: white,
    
    iconFill: purple,
    
    background: white,
    color: darkGrey,
    borderColor: darkGrey,
    outlineColor: darkGrey,
    borderBottomColor: purple,
    graphLineColor: green,
    graphTextColor: purple,
    
    infoCalloutBackground: lightPurple,
    infoCalloutBorder: 'transparent',
  },
  dark: {
    navBarBackground: darkBlue,
    navBarBorder: white,
    navBarText: white,
    navBarActive: yellow,
    navBarInactive: white,
    
    iconFill: purple,
    
    background: darkBlue,
    color: white,
    borderColor: purple,
    outlineColor: white,
    borderBottomColor: purple,
    graphLineColor: red,
    graphTextColor: white,
    
    infoCalloutBackground: 'transparent',
    infoCalloutBorder: purple,
  }
}