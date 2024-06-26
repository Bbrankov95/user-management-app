import Button from "antd/es/button";

import type { Task } from "pages/TasksPage/types";
import useCompleteTodo from "./useCompleteTodo";

type CompleteTodoButtonProps = {
  taskId: Task["id"];
  disabled: boolean;
};

const CompleteTodoButton: React.FC<CompleteTodoButtonProps> = ({
  taskId,
  disabled,
}) => {
  const [completeTodo] = useCompleteTodo();

  return (
    <Button
      type="primary"
      onClick={() => completeTodo(taskId)}
      disabled={disabled}
    >
      Complete
    </Button>
  );
};

export default CompleteTodoButton;
