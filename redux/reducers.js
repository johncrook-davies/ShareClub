import { combineReducers } from "redux";
import clubs from '../clubs/reducers';
import proposals from '../proposals/reducers';
import invitations from '../invitations/reducers';
import connection from '../websockets/reducers';
import db from '../db/reducers';
import settings from '../settings/reducers';
import { indices, stocks, exchanges } from '../investments/reducers';

export default combineReducers({ indices, stocks, exchanges, clubs, proposals, invitations, connection, db, settings })