import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutline from "@ant-design/icons/CheckCircleOutlined";
import Flex from "antd/es/flex";
import Table from "antd/es/table";
import Button from "antd/es/button";

import { tasksAPI, usersAPI } from "services";
import { Todo } from "types";
import { useAppSelector } from "store";
import { insertUsers } from "store/slices/usersSlice";
import { insertTodos, updateTodo } from "store/slices/todosSlice";

const TasksPage = () => {
  const usersById = useAppSelector((state) => state.users.byId);
  const todosById = useAppSelector((state) => state.todos.byId);
  const dispatch = useDispatch();
  const todos = Object.values(todosById).map((todo) => todo);

  const filterOptionByOwner = Object.keys(usersById).map((key) => ({
    value: key,
    text: usersById[Number(key)].name,
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Owner",
      key: "userId",
      dataIndex: "userId",
      render: (userId: Todo["userId"]) => <p>{usersById?.[userId]?.name}</p>,
      sorter: (a: Todo, b: Todo) => (a.userId > b.userId ? 1 : -1),
      onFilter: (value: boolean | React.Key, record: Todo) =>
        Number(value) === record.userId,
      filters: filterOptionByOwner,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: Todo["completed"]) => {
        if (completed) {
          return <CheckCircleOutline style={{ fontSize: 20, color: "lime" }} />;
        } else {
          return <CloseCircleOutlined style={{ fontSize: 20, color: "red" }} />;
        }
      },
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
      onFilter: (value: boolean | React.Key, record: Todo) =>
        !!value === record.completed,
    },
    {
      title: "",
      key: "button",
      render: (todo: Todo) => (
        <Button
          type="primary"
          onClick={() => dispatch(updateTodo({ ...todo, completed: true }))}
          disabled={todo.completed}
        >
          Complete
        </Button>
      ),
    },
  ];

  const dataSource = todos.map((todo, i) => ({ ...todo, key: `${i + 1}` }));

  const getData = useCallback(async () => {
    try {
      if (!Object.keys(todosById).length) {
        const todos = (await tasksAPI.getTasks()).data;
        dispatch(insertTodos(todos));
      }
      if (!Object.keys(usersById).length) {
        const users = (await usersAPI.getUsers()).data;
        dispatch(insertUsers(users));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, todosById, usersById]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Flex vertical flex={1}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSizeOptions: [] }}
      />
    </Flex>
  );
};

export default TasksPage;
