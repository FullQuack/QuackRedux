import { GET_FEED } from '../actions/types';
import { ADD_LIKE } from '../actions/types';
import { DELETE_LIKE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.payload;
    case ADD_LIKE:
      return action.payload;
    case DELETE_LIKE:
      return action.payload;
    default:
      return state;
  }
}
