import axios from 'axios';
import { ADD_POST, GET_FEED, ADD_LIKE, DELETE_LIKE } from './types';


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
export const deleteLike = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: DELETE_LIKE,
      payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: DELETE_LIKE,
        payload: err.response.data
      })
    );
};
export const addLike = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: ADD_LIKE,
      payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: ADD_LIKE,
        payload: err.response.data
      })
    );
};
