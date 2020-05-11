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

const stocks = {
  bySymbol: {
    "ZCC-LN": {"created_at": "2020-05-03T12:49:34.986Z", "exchange_id": 1, "id": 7789, "latest_price": null, "name": "ZCCM Investments Holdings PLC Class B", "symbol": "ZCC-LN", "updated_at": "2020-05-03T12:49:34.986Z"}, 
    "ZEG-LN": {"created_at": "2020-05-03T12:49:35.352Z", "exchange_id": 1, "id": 7790, "latest_price": null, "name": "Zegona Communications Plc", "symbol": "ZEG-LN", "updated_at": "2020-05-03T12:49:35.352Z"}
  }
}

const indices = [{"created_at": "2020-05-03T12:58:05.691Z", "exchange_id": 1, "id": 2, "latest_price": "5936.0", "name": "FTSE 100", "stocks": ["III-LN", "ABF-LN", "ADM-LN", "AAL-LN", "ANTO-LN"], "symbol": "FTSE", "updated_at": "2020-05-08T13:53:57.968Z"}]

const invitations = [
  {
    id: 1,
    name: 'Tess Yellanda',
    club: 'Original Pirate Investors'
  },
  {
    id: 2,
    name: 'Rob Brown',
    club: "Investors not haters"
  }
]
const clubs = [
  {
    id: 1,
    name: 'The jolly savers',
    value: 3456.64
  },
  {
    id: 2,
    name: 'Cash club',
    value: 10325
  },
  {
    id: 3,
    name: 'Big money mondays',
    value: 103259823.23
  }
]
const proposals = [
{
  id: 1,
  name: 'Dan James',
  trades: JSON.stringify([
    {
      name: "Higher Skin Industries",
      symbol: "HSK",
      type: 'buy',
      value: 837
    },
    {
      name: "Sudo Foods",
      symbol: "SUDO",
      type: 'buy',
      value: 223
    },
    {
      name: "Cash",
      symbol: "CASH",
      type: 'sell',
      value: -1000
    }
  ])
},
{
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
}
]

export const syncdb = {
          get: get
      };
const db = {readyState: 'ready', call: syncdb},
      conn = {ws: jest.fn(() => new Promise((r)=>r))};
export const store = mockStore({
  db, conn, stocks, indices, clubs, proposals, invitations
});