import { createSlice } from "@reduxjs/toolkit";

import { type RootState } from "shared/store";

import type { Task } from "./types";

type IState = {
  data: Task[];
  loading: boolean;
  hasFetched: boolean;
  error: string;
};

const initialState: IState = {
  data: [],
  loading: false,
  hasFetched: false,
  error: "",
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
      state.data = action.payload;
      state.hasFetched = true;
      state.loading = false;
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
export default tasksSlice.reducer;
