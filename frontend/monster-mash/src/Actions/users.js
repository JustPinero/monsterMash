import axios from 'axios';
import { push } from 'react-router-redux'

import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  ADD_USER,
  REMOVE_USER
} from './types';

export const gotUser = user => ({
  type: GET_USER,
  payload: user
});
export const update = user => ({
  type: UPDATE_USER,
  payload: user
});

export const fetchCandidates = () => async dispatch => {
  try {
    const res = await axios.get('/users')
    dispatch(gotUser(res.data))
  } catch (err) {
    console.error('Fetching Users unsuccessful', err)
  }
}

export const addUser = newUser => async dispatch => {
  try {
    const res = await axios.post('/users', newUser)
    dispatch({ type: ADD_USER, payload: res.data })
    dispatch(push(`/users/${res.data.id}`))
  } catch (err) {
    console.error('Adding user unsuccessful', err)
  }
}
