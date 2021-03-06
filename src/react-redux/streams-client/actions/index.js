import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

// Action Creator
export const signIn = (userId) => {
  // Return an Action
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

// Action Creator
export const signOut = () => {
  // Return an Action
  return {
    type: SIGN_OUT,
  };
};

// Action Creator
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", {...formValues, userId});
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/'); // navigate back to stream list
};

// Action Creator
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Action Creator
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Action Creator
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues); // patch vs put {some property update vs replacing entire properties with new one}
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/'); // navigate back to stream list
};

// Action Creator
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/'); // navigate back to stream list
};
