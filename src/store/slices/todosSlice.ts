import { createSlice } from "@reduxjs/toolkit";

import { type Todo, type NormalizedState } from "types";
import { type RootState } from "../store/store";

const initialState: NormalizedState<Todo> = {
  byId: {},
  allIds: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    insertTodos: (state, { payload }: { payload: Todo[] }) => {
      for (const todo of payload) {
        if (!state.byId[todo.id]) {
          state.byId[todo.id] = todo;
          state.allIds.push(todo.id);
        }
      }
    },
    updateTodo: (state, { payload }: { payload: Todo }) => {
      if (state.byId[payload.id]) {
        state.byId[payload.id] = payload;
      }
    },
  },
});

export const selectTodoById = (state: RootState, id: Todo["id"]) =>
  state.todos.byId[id];
export const selectTodosAllIds = (state: RootState) => state.todos.allIds;
export const { insertTodos, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
