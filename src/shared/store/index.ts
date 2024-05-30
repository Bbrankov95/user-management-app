import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import {
  configureStore,
  combineReducers,

} from "@reduxjs/toolkit";

import {tasksReducer} from "pages/TasksPage/tasksSlice";
import {usersReducer} from "pages/UsersPage/usersSlice";

const combinedReducers = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default store;
