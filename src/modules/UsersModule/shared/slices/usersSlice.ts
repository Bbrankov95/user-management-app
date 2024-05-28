import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "shared/store";

import type { User } from "../types";

type IState = {
  data: User[];
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersInit: (state) => {
      state.data = [];
      state.hasFetched = true;
      state.error = "";
    },
    fetchUsersSuccess: (state, action) => {
      state.data = action.payload;
      state.hasFetched = true;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const selectUsers = (state: RootState) => state.users;

export const {
  fetchUsersFailure,
  fetchUsersInit,
  fetchUsersSuccess,
  resetState,
} = usersSlice.actions;
export default usersSlice.reducer;
