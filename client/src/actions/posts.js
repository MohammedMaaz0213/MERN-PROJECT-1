import * as api from "../api/index.js";
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  START_LOADING,
  END_LOADING,
  COMMENT,
} from "../constants/acionTypes.js";
export const getPost = (id) => async (dispatch) => {
  try {
    console.log("a");

    dispatch({ type: START_LOADING });
    console.log("a");

    const { data } = await api.fetchPost(id);
    console.log("a");

    dispatch({ type: FETCH_POST, payload: data });
    console.log("a");

    dispatch({ type: END_LOADING });
    console.log("lol");
  } catch (err) {
    console.log(err);
  }
};
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    history(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log("updating herer........");
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    console.log(data);
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
