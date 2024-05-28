import { useSelector, type TypedUseSelectorHook } from "react-redux";
import {
  configureStore,
  combineReducers,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit";

import taskModuleReducer from "modules/TasksModule/tasksModuleReducer";
import usersModuleReducer from "modules/UsersModule/usersModuleReducer";

const combinedReducers = combineReducers({
  users: usersModuleReducer,
  tasks: taskModuleReducer,
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