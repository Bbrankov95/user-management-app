import { createSlice } from "@reduxjs/toolkit";

import { type Post, type NormalizedState } from "types";
import { type RootState } from "../store/store";

const initialState: NormalizedState<Post> = {
  byId: {},
  allIds: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    insertPosts: (state, { payload }: { payload: Post[] }) => {
      for (const post of payload) {
        if (!state.byId[post.id]) {
          state.byId[post.id] = post;
          state.allIds.push(post.id);
        }
      }
    },
    updatePost: (state, { payload: { postId, updatedPost } }) => {
      if (state.byId[postId]) {
        state.byId[postId] = updatedPost;
      }
    },
    deletePost: (state, { payload: postId }) => {
      if (state.byId[postId]) {
        delete state.byId[postId];
        const index = state.allIds.indexOf(postId);
        if (index > -1) {
          state.allIds.splice(index, 1);
        }
      }
    },
    disposePosts: (state) => {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const selectPostById = (state: RootState, id: Post["id"]) =>
  state.posts.byId[id];
export const selectPostsAllIds = (state: RootState) => state.posts.allIds;
export const { insertPosts, updatePost, deletePost, disposePosts } =
  postsSlice.actions;
export default postsSlice.reducer;
