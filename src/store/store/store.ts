import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { postsReducer, usersReducer, todosReducer } from "store/slices";

const combinedReducers = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  todos: todosReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
