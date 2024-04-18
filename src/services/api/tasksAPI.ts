import { axiosInstance } from "services";
import { Todo } from "types";

export const getTasks = () => axiosInstance.get<Todo[]>("/todos");
