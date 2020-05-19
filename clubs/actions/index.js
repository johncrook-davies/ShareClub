import {
  CLUB_CREATE,
  CLUB_UPDATE,
  CLUB_DELETE,
} from "./actionTypes";

export const clubCreate = club => ({
  type: CLUB_CREATE,
  payload: club
})

export const clubUpdate = club => ({
  type: CLUB_UPDATE,
  payload: club
})

export const clubDelete = id => ({
  type: CLUB_DELETE,
  payload: id
})