export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';

const initialState = {
  csrfToken: "jlAFYgbAD397bQDQBO7bde",
  colourScheme: 'light',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_UPDATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}