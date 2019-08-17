import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTO_FAILURE = "FETCH_PHOTO_FAILURE";

export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const DELETE_IMAGE_FAILURE = "DELETE_IMAGE_FAILURE";

const fetchPhotosSuccess = photos => ({type: FETCH_PHOTO_SUCCESS, photos});
const fetchPhotosFailure = error => ({type: FETCH_PHOTO_FAILURE, error});

const deleteImageSuccess = () => ({type: DELETE_IMAGE_SUCCESS});
const deleteImageFailure = error => ({type: DELETE_IMAGE_FAILURE, error});

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

export const deleteImage = (id) => {
  return dispatch => {
    return axios.delete('/places/' + id).then(
      () => {
        dispatch(deleteImageSuccess());
        NotificationManager.success('Deleted successfully');
      },
      error => {
        if (error.response && error.response.data) {
          dispatch(deleteImageFailure(error.response.data));
        } else {
          dispatch(deleteImageFailure({global: 'No connection'}))
        }

      }
    )
  }
};