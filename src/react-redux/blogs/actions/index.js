import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from "lodash";
import id from "faker/lib/locales/id_ID";

// // Action Creator this one won't work need redux thunk
// export const fetchPosts = async () => {
//   const response = await jsonPlaceHolder.get("/posts");
//   // Return an Action
//   return {
//     type: "FETCH_POSTS",
//     payload: response,
//   };
// };

// Action Creator using redux thunk
export const fetchPosts = () => {
  return async function (dispatch, getState) {
    const response = await jsonPlaceHolder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

// Action Creator using redux thunk using ES 2016 syntax.. basically same as above
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

// Action Creator User call using lodash memoize but disadvantage is that we can't use the fetch users independently
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });

// Alternate way to achive getPosts and getUsers call in this way fetPosts and fetchUser can be used independently wherever required
// export const fetchPostsAndUsers = () => {
//   return async function (dispatch, getState) {
//     await dispatch(fetchPosts());
//     console.log(getState.posts);
//     const userIds = _.uniq(_.map(getState.posts, "userId"));
//     userIds.forEach((id) => dispatch(fetchUser(id)));
//   };
// };

export const fetchPostsAndUsers = () =>  async (dispatch, getState) => {
    // Call fetch posts dispatcher
    await dispatch(fetchPosts());
    
    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach((id) => dispatch(fetchUser(id)));
};
