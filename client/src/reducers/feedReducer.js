import { GET_FEED } from '../actions/types';


const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.payload;
    default:
      return state;
  }
}
