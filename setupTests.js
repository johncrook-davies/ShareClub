import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([]);


const get = jest.fn((props) => {
  switch(props.all) {
    case 'indices':
      return new Promise( resolve => {
        resolve([{
          name: 'FTSE 100',
          symbol: 'FTSE',
          stocks: JSON.stringify(['One', 'Two'])
        }])
      })
    case 'stocks':
      return new Promise( resolve => {
        resolve([{
          name: 'Kasdsu Houts Doopi',
          symbol: 'KHD',
          latest_price: 124124.234
        }])
      })
    default:
      new Promise( resolve => resolve('default') )
  }
}); 

//const get = jest.fn(() => new Promise((r)=>r))

export const syncdb = {
          get: get
      };
const db = {readyState: 'ready', call: syncdb},
      conn = {ws: jest.fn(() => new Promise((r)=>r))};
export const store = mockStore({db, conn});