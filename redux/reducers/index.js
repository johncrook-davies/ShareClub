import { combineReducers } from "redux";
import clubs from './clubs';
import proposals from './proposals';
import invitations from './invitations';
import connection from './connection';

export default combineReducers({ clubs, proposals, invitations, connection })