import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_FAILURE = "FETCH_PLACE_FAILURE";

export const FETCH_ONE_PLACE_SUCCESS = 'FETCH_ONE_PLACE_SUCCESS';
export const FETCH_ONE_PLACE_FAILURE = 'FETCH_ONE_PLACE_FAILURE';

export const DELETE_PLACE_SUCCESS = 'DELETE_PLACE_SUCCESS';
export const DELETE_PLACE_FAILURE = "DELETE_PLACE_FAILURE";

const fetchPlacesSuccess = places => ({type: FETCH_PLACE_SUCCESS, places});
const fetchPlacesFailure = error => ({type: FETCH_PLACE_FAILURE, error});

const fetchOnePlaceSuccess = place => ({type: FETCH_ONE_PLACE_SUCCESS, place});
const fetchOnePlaceFailure = error => ({type: FETCH_ONE_PLACE_FAILURE, error});

const deletePlaceSuccess = () => ({type: DELETE_PLACE_SUCCESS});
const deletePlaceFailure = error => ({type: DELETE_PLACE_FAILURE, error});


export const fetchPlaces = () => {
  return dispatch => {
    return axios.get('/places').then(
      response => dispatch(fetchPlacesSuccess(response.data)),
      error => dispatch(fetchPlacesFailure(error))
    )
  };
};

export const fetchOnePlace = id => {
  return dispatch => {
    return axios.get(`/places/${id}`).then(
      response => dispatch(fetchOnePlaceSuccess(response.data)),
      error => dispatch(fetchOnePlaceFailure(error))
    )
  };
};

export const addPlace = data => {
  return dispatch => {
    return axios.post('/places', data).then(() => {
      dispatch(push('/'));
      NotificationManager.success('Success')
    })
  }
};

export const deletePlace = (id) => {
  return dispatch => {
    return axios.delete('/places/' + id).then(
      () => {
        dispatch(deletePlaceSuccess());
        NotificationManager.success('Deleted successfully');
      },
      error => {
        if (error.response && error.response.data) {
          dispatch(deletePlaceFailure(error.response.data));
        } else {
          dispatch(deletePlaceFailure({global: 'No connection'}))
        }

      }
    )
  }
};