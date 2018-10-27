import axios from 'axios';
import { ADD_POST, GET_FEED, ADD_LIKE } from './types';


export const getFeed = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_FEED,
      payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: GET_FEED,
        payload: err.response.data
      })
    );
};