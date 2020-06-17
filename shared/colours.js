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
    
    buttonBackground: purple,
    buttonBorder: 'transparent',
    buttonText: white,
    
    modalBackground: white,
    modalShadow: black,
    modalShadowOpacity: 0.2,
    
    inputBorder: purple,
    placeholderColour: darkGrey,
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
    
    buttonBackground: 'transparent',
    buttonBorder: purple,
    buttonText: white,
    
    modalBackground: darkBlue,
    modalShadow: black,
    modalShadowOpacity: 0.75,
    
    inputBorder: white,
    placeholderColour: darkGrey,
  }
}