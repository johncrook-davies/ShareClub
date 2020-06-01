import { combineReducers } from "redux";
import clubs from '../clubs/reducers';
import proposals from '../proposals/reducers';
import invitations from './invitations';
import connection from '../websockets/reducers';
import db from '../db/reducers';
import { indices, stocks, exchanges } from '../investments/reducers';

export default combineReducers({ indices, stocks, exchanges, clubs, proposals, invitations, connection, db })