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
    case 'clubs':
      return new Promise( resolve => {
        resolve([{
          id: 1,
          name: 'The jolly savers',
          value: 3456.64
        }])
      })
    case 'invitations':
      return new Promise( resolve => {
        resolve([{
          id: 1,
          name: 'Tess Yellanda',
          club: 'Original Pirate Investors'
        }])
      })
    case 'proposals':
      return new Promise( resolve => {
        resolve([{
          id: 2,
          name: 'Dave Smith',
          trades: JSON.stringify([
            {
              name: 'Sydney Financial',
              symbol: 'SYDO',
              type: 'sell',
              value: -234
            },
            {
              name: 'Yoda Ku Technologies',
              symbol: 'YDKF',
              type: 'buy',
              value: 234
            }
          ])
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