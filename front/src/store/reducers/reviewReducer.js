import {FETCH_REVIEW_SUCCESS, FETCH_REVIEW_FAILURE} from "../actions/reviewAction";

const initialState = {
  reviews: [],
  error: null
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEW_SUCCESS:
      return {...state, reviews: action.reviews};
    case FETCH_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reviewReducer;