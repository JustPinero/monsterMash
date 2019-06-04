import {
  GET_USER,
  UPDATE_USER
} from '../actions';

const initialState = {}

export default function reducer(user = initialState, action) {
    switch (action.type) {
    case GET_USER:
        return {...action.payload};
    default:
        return user;
      }
    }
