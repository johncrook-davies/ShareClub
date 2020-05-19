import sagaHelper from 'redux-saga-testing';
import { put, select, call } from 'redux-saga/effects';
import { getDatabase } from '../selectors';
import {
  createInDatabase,
  updateInDatabase,
} from '../sagas';

const club = {name: 'The jolly savers'};

describe('Clubs', () => {
  const db = {call: {create: jest.fn(), exists: jest.fn()}}
  describe('Create club', () => {
    const it = sagaHelper(createInDatabase({payload: club}));
    it('calls selector to get database', result => {
      expect(result)
        .toEqual(select(getDatabase));
      return db;
    });
    it('calls database exits for club', result => {
      expect(result).toEqual(call([db.call,'exists'],{clubs: {id: undefined}}));
    });
  })
  describe('Update club', () => {
    const it = sagaHelper(updateInDatabase({
      payload: {
        id: 1, 
        name: 'The jolly savers'
      }
    }));
    it('calls selector to get database', result => {
      expect(result)
        .toEqual(select(getDatabase));
      return db;
    });
  })
});