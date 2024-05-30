import { useEffect } from "react";

import { useAppDispatch } from "shared/store";
import { fetchTasksAndFilters, resetState } from "./tasksSlice";
import TasksTable from "./grid/TasksTable";

const TasksPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksAndFilters());

    return () => {
      dispatch(resetState());
    };
  }, []);

  return <TasksTable />;
};

export default TasksPage;
