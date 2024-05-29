import type { Task } from "pages/TasksPage/types";
import type { User } from "shared/types";

const mapTaskWithUser = ({
  tasks,
  users,
}: {
  tasks: Task[];
  users: User[];
}) => {
  return tasks.map((task) => ({
    ...task,
    user: users.find((user) => task.userId === user.id),
  }));
};

export default mapTaskWithUser;
