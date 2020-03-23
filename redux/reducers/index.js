import { combineReducers } from "redux";
import clubs from './clubs';
import proposals from './proposals';
import invitations from './invitations';

export default combineReducers({ clubs, proposals, invitations })