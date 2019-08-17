import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE';

const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEW_SUCCESS, reviews});
const fetchReviewsFailure = error => ({type: FETCH_REVIEW_FAILURE, error});

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