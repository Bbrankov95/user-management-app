import { createSlice } from "@reduxjs/toolkit";

import { type User, type NormalizedState } from "types";
import { type RootState } from "../store/store";

const initialState: NormalizedState<User> = {
  byId: {},
  allIds: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    insertUsers: (state, { payload }: { payload: User[] }) => {
      for (const user of payload) {
        if (!state.byId?.[user.id]) {
          state.byId[user.id] = user;
          state.allIds.push(user.id);
        }
      }
    },
    updateUser: (
      state,
      {
        payload: { id, updatedUser },
      }: { payload: { id: User["id"]; updatedUser: User } }
    ) => {
      if (state.byId[id]) {
        state.byId[id] = updatedUser;
      }
    },
  },
});

export const selectUserById = (state: RootState, id: User["id"]) =>
  state.users.byId[id];
export const selectUsersAllIds = (state: RootState) => state.users.allIds;
export const { insertUsers, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
