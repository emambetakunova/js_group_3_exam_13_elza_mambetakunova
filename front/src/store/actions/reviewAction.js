import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

import axios from "../../axios-api";

export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';

const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEW_SUCCESS, reviews});

export const addReview = (data, id) => {
  return dispatch => {
    return axios.post(`/places/review/${id}`, data).then(
      response => {
        dispatch(fetchReviewsSuccess(response.data));
        dispatch(push(`/places/${id}`));
        NotificationManager.success('Review success')
      })
  }
};