import { Task, User } from "shared/types";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutline from "@ant-design/icons/CheckCircleOutlined";
import CompleteButton from "./components/Comp[eteButton";

const columns = (userFilter: any) => ([
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
      onFilter: (value: boolean | React.Key, record: Task) =>{
        return value === record.userId
      }
      ,
      filters:  userFilter
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
      onFilter: (value: boolean | React.Key, record: Task) =>
        !!value === record.completed,
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
      render: (task: Task) => <CompleteButton disabled={task.completed} taskId={task.id} />,
    },
  ]);

  export default columns;