import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE';

export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEW_SUCCESS, reviews});
const fetchReviewsFailure = error => ({type: FETCH_REVIEW_FAILURE, error});

const deleteReviewSuccess = () => ({type: DELETE_REVIEW_SUCCESS});
const deleteReviewFailure = error => ({type: DELETE_REVIEW_FAILURE, error});

export const fetchReviews = (id) => {
  return dispatch => {
    return axios.get('/review/' + id).then(
      response => dispatch(fetchReviewsSuccess(response.data)),
      error => dispatch(fetchReviewsFailure(error))
    )
  };
};

export const addReview = (data, id) => {
  return dispatch => {
    return axios.post(`/review/${id}`, data).then(
      response => {
        console.log(response.data);
        dispatch(fetchReviewsSuccess());
        dispatch(fetchReviews(id));
        NotificationManager.success('Review success')
      })
  }
};

export const deleteReview = (id) => {
  return dispatch => {
    return axios.delete('/review/' + id).then(
      () => {
        dispatch(deleteReviewSuccess());
        NotificationManager.success('Deleted successfully');
      },
      error => {
        if (error.response && error.response.data) {
          dispatch(deleteReviewFailure(error.response.data));
        } else {
          dispatch(deleteReviewFailure({global: 'No connection'}))
        }

      }
    )
  }
};