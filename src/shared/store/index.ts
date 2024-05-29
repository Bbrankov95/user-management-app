import { useSelector, type TypedUseSelectorHook } from "react-redux";
import {
  configureStore,
  combineReducers,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit";

import {tasksReducer} from "pages/TasksPage/tasksSlice";
import {usersReducer} from "pages/UsersPage/shared/slices/usersSlice";

const combinedReducers = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
