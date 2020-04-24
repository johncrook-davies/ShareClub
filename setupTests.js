import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([]);
export const syncdb = {
          get: jest.fn(() => new Promise((r)=>r))
      };
const db = {readyState: 'ready', call: syncdb},
      conn = {ws: jest.fn(() => new Promise((r)=>r))};
export const store = mockStore({db, conn});