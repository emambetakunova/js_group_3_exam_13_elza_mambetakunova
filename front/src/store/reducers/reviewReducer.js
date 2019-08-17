import {FETCH_REVIEW_SUCCESS} from "../actions/reviewAction";

const initialState = {
  reviews: []
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEW_SUCCESS:
      return {...state, reviews: action.reviews};
    default:
      return state;
  }
};

export default reviewReducer;