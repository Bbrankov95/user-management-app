import Flex from "antd/es/flex";
import Table from "antd/es/table";
import { useAppSelector } from "shared/store";
import { selectTasks } from "pages/TasksPage/tasksSlice";
import columns from "./columns";

const TasksTable = () => {
  const { data: tasks, loading, filterOptions } = useAppSelector(selectTasks);

  return (
    <Flex vertical flex={1}>
      <Table
        rowHoverable
        bordered
        dataSource={tasks}
        columns={columns(filterOptions)}
        pagination={{ pageSizeOptions: [] }}
        loading={loading}
      />
    </Flex>
  );
};

export default TasksTable;
