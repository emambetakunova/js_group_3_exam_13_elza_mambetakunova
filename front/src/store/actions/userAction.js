import {push} from 'connected-react-router';
import {NotificationManager}  from 'react-notifications';
import axios from '../../axios-api';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
  return dispatch => {
    return axios.delete('/users/sessions').then(
      () => {
        dispatch({type: LOGOUT_USER});
        dispatch(push('/'));
        NotificationManager.success('Logout')
      },
      error => {
        NotificationManager.error('Could not logged!')
      }
    )
  }
};

export const registerUser = userData => {
  return dispatch => {
    return axios.post('/users', userData).then(
      response => {
        dispatch(registerUserSuccess(response.data.user));
        dispatch(push('/'));
        NotificationManager.success('Success')
      },
      error => {
        if (error.response) {
          dispatch(registerUserFailure(error.response.data))
        } else {
          dispatch(registerUserFailure({global: 'No connection'}))
        }
      }
    )
  }
};

export const loginUser = userData => {
  return dispatch => {
    return axios.post('/users/sessions', userData).then(
      response => {
        dispatch(loginUserSuccess(response.data.user));
        dispatch(push('/'));
        NotificationManager.success('Success')
      }, error => {
        if (error.response) {
          dispatch(loginUserFailure(error.response.data))
        } else {
          dispatch(loginUserFailure({global: 'No connection'}))
        }
      }
    )
  }
};