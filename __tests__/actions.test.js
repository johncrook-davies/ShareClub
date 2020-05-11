import sagaHelper from 'redux-saga-testing';
import { put, select, call } from 'redux-saga/effects';
import { getDatabase } from '../redux/selectors';
import {
  createClub
} from '../redux/sagas/clubs';

const club = {name: 'The jolly savers'};

describe('Clubs', () => {
  const db = {call: {create: jest.fn()}}
  beforeAll(() => {
    
  })
  describe('Create', () => {
    const it = sagaHelper(createClub(club));
    it('calls selector to get database first', result => {
      expect(result)
        .toEqual(select(getDatabase));
      return db;
    });
    it('calls create club action wit club', result => {
      expect(result)
        .toEqual(put(
          { 
            type: 'CREATE_CLUB', 
            club: club
          }
        ))
    });
    it('calls database create with club', result => {
      expect(result).toEqual(call(db.call.create,{clubs: club}));
    });
    it('is done', result => {
      expect(result).toBeUndefined();
    });
  })
});