import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTO_FAILURE = "FETCH_PHOTO_FAILURE";

const fetchPhotosSuccess = photos => ({type: FETCH_PHOTO_SUCCESS, photos});
const fetchPhotosFailure = error => ({type: FETCH_PHOTO_FAILURE, error});

export const fetchPhotos = (id) => {
  return dispatch => {
    return axios.get('/places/' + id).then(
      response => dispatch(fetchPhotosSuccess(response.data)),
      error => dispatch(fetchPhotosFailure(error))
    )
  };
};

export const addPhoto = (data, id) => {
  return dispatch => {
    return axios.post(`/places/addPhoto/${id}`, data).then(
      response => {
        dispatch(fetchPhotosSuccess());
        dispatch(fetchPhotos(id));
        NotificationManager.success('Photos added')
      })
  }
};