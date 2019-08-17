import {FETCH_PHOTO_FAILURE, FETCH_PHOTO_SUCCESS} from "../actions/photoAction";

const initialState = {
  photos: null,
  error: null
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTO_SUCCESS:
      return {...state, photos: action.photos};
    case FETCH_PHOTO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default photoReducer;