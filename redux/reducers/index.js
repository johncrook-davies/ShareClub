import { combineReducers } from "redux";
import clubs from './clubs';
import proposals from './proposals';
import invitations from './invitations';
import connection from './connection';
import db from './db';
import indices from './indices';
import stocks from './stocks';
import exchanges from './exchanges';

export default combineReducers({ indices, stocks, exchanges, clubs, proposals, invitations, connection, db })