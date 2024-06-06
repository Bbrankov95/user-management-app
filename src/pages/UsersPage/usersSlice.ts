import {type Dispatch, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "services";
import type { RootState } from "shared/store";

import type { User } from "shared/types";

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
    updateUser: (state, action) => {
      state.data = state.data.map(user => user.id === action.payload.id ? action.payload : user)
    }
  },
});

export const selectUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: number) => state.users.data.find(user => user.id === userId)
export const {
  fetchUsersFailure,
  fetchUsersInit,
  fetchUsersSuccess,
  resetState,
  updateUser,
} = usersSlice.actions;
export const {reducer: usersReducer} = usersSlice;

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersInit())
  try {
    const {data:users} = await axiosInstance.get("/users");
    dispatch(fetchUsersSuccess(users))
  } catch(error) {
    dispatch(fetchUsersFailure(error))
  }
}