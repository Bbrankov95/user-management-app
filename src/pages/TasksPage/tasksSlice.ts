import { Dispatch, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "shared/store";

import type { Task } from "./types";
import { axiosInstance } from "services";
import {createUserFilterOptions,mapTaskWithUser} from './utils'

type IState = {
  data: Task[];
  loading: boolean;
  hasFetched: boolean;
  error: string;
  filterOptions:  { value: number; text: string }[]
};

const initialState: IState = {
  data: [],
  loading: false,
  hasFetched: false,
  error: "",
  filterOptions: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksInit: (state) => {
      state.data = [];
      state.hasFetched = true;
      state.error = "";
    },
    fetchTasksSuccess: (state, action) => {
      state.data = action.payload.data;
      state.hasFetched = true;
      state.loading = false;
      state.filterOptions = action.payload.options
    },
    fetchTasksFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetState: () => {
      return initialState;
    },
    completeTask: (state, action) => {
      state.data = state.data.map(task => task.id === action.payload ? { ...task, completed: true } : task)
    }
  },
});

export const selectTasks = (state: RootState) => state.tasks;
export const {
  fetchTasksFailure,
  fetchTasksInit,
  fetchTasksSuccess,
  resetState,
  completeTask
} = tasksSlice.actions;
export const {reducer: tasksReducer} = tasksSlice;

export const fetchTasksAndFilters = () => async(dispatch: Dispatch) => {
  dispatch(fetchTasksInit())
  try {
    const [{ data: tasks }, { data: users }] = await Promise.all([
          axiosInstance.get("/todos"),
          axiosInstance.get("/users"),
        ]);
        const filterOptionByOwner = createUserFilterOptions(users);
        const mappedTasks = mapTaskWithUser({ tasks, users });
        dispatch(fetchTasksSuccess({data: mappedTasks,options: filterOptionByOwner}));
  } catch(error) {
    dispatch(fetchTasksFailure(error))
  }
}