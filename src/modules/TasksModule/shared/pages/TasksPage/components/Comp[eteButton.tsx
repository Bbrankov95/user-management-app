import Button from "antd/es/button";
import { Task } from "shared/types";
import useCompleteTodo from "modules/TasksModule/shared/hooks/useCompleteTodo";


type CompleteButtonProps = {
    taskId: Task['id'];
    disabled: boolean;
}

const CompleteButton:React.FC<CompleteButtonProps> = ({taskId,disabled}) => {
    const [completeTodo] = useCompleteTodo()

    return  <Button
    type="primary"
    onClick={() => completeTodo(taskId)}
    disabled={disabled}
  >
    Complete
  </Button>


}


export default CompleteButton;