import { SETTINGS_UPDATE } from '../reducers';

export const settingsUpdate = settings => ({
  type: SETTINGS_UPDATE,
  payload: settings
})