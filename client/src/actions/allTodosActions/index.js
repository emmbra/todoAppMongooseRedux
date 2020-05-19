import {
  GET_ALL_TODOS,
  GET_ALL_TODOS_ERROR,
  GET_USER_TODOS,
  GET_USER_TODOS_ERROR,
} from "../types";
import axios from "axios";

// must manually dispatch api calls to reducers
// function that returns another function
export const getAllTodos = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/todos");
    dispatch({ type: GET_ALL_TODOS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_TODOS_ERROR, payload: error });
  }
};

export const getUserTodos = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/user/todos', { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({ type: GET_USER_TODOS, payload: data })
  } catch (error) {
    dispatch({ type: GET_USER_TODOS_ERROR, serverError: error, clientError: 'Something went wrong! Refresh page and try again.' });
  }
}
