import { useDispatch } from "react-redux";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutline from "@ant-design/icons/CheckCircleOutlined";
import Flex from "antd/es/flex";
import Table from "antd/es/table";
import Button from "antd/es/button";

import { useAppSelector } from "store";
import {
  fetchTasksFailure,
  fetchTasksSuccess,
  selectTasks,
  resetState,
  fetchTasksInit,
} from "../../slices/tasksSlice";
import { useEffect } from "react";
import { axiosInstance } from "services";
import { Task, User } from "shared/types";
import mapTaskWithUser from "../../utils/mapTaskWithUser";

const TasksPage = () => {
  const { data: tasks } = useAppSelector(selectTasks);
  const dispatch = useDispatch();

  // const filterOptionByOwner = users.map((user) => ({
  //   value: user.id,
  //   text: user.name,
  // }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Owner",
      key: "userId",
      dataIndex: "user",
      render: (task: User) => <p>{task.name}</p>,
      sorter: (a: Task, b: Task) => {
        if (a.user?.name && b.user?.name) {
          return a.user?.name > b.user?.name ? 1 : -1;
        } else {
          return 1;
        }
      },
      // onFilter: (value: boolean | React.Key, record: Todo) =>
      //   Number(value) === record.userId,
      // filters: filterOptionByOwner,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      filters: [
        {
          text: "Completed",
          value: true,
        },
        {
          text: "Not Completed",
          value: false,
        },
      ],
      // onFilter: (value: boolean | React.Key, record: Todo) =>
      //   !!value === record.completed,
      render: (completed: Task["completed"]) => {
        if (completed) {
          return <CheckCircleOutline style={{ fontSize: 20, color: "lime" }} />;
        } else {
          return <CloseCircleOutlined style={{ fontSize: 20, color: "red" }} />;
        }
      },
    },
    {
      title: "",
      key: "button",
      render: (task: Task) => (
        <Button
          type="primary"
          // onClick={() => dispatch(updateTodo({ ...todo, completed: true }))}
          disabled={task.completed}
        >
          Complete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(fetchTasksInit());
      try {
        const [{ data: tasks }, { data: users }] = await Promise.all([
          axiosInstance.get("/todos"),
          axiosInstance.get("/users"),
        ]);
        const mappedTasks = mapTaskWithUser({ tasks, users });
        dispatch(fetchTasksSuccess(mappedTasks));
      } catch (error) {
        dispatch(fetchTasksFailure(error));
      }
    };
    fetchTasks();

    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <Flex vertical flex={1}>
      <Table
        rowHoverable
        bordered
        dataSource={tasks}
        columns={columns}
        pagination={{ pageSizeOptions: [] }}
      />
    </Flex>
  );
};

export default TasksPage;
