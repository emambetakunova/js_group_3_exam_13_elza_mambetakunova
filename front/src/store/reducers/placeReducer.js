import {FETCH_PLACE_SUCCESS, FETCH_PLACE_FAILURE, FETCH_ONE_PLACE_SUCCESS, FETCH_ONE_PLACE_FAILURE} from "../actions/placeAction";

const initialState = {
  places: [],
  place: null,
  error: null
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACE_SUCCESS:
      return {...state, places: action.places};
    case FETCH_PLACE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case FETCH_ONE_PLACE_SUCCESS:
      return {...state, place: action.place};
    case FETCH_ONE_PLACE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default placeReducer;