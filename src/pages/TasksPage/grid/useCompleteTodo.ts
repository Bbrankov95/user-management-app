import { useState } from "react"
import { useDispatch } from "react-redux";

import type { Task } from "pages/TasksPage/types";
import { completeTask } from 'pages/TasksPage/tasksSlice'

const useCompleteTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const completeTodo = (id: Task['id']) => {
        setIsLoading(true)
        try {
            dispatch(completeTask(id))
        } catch (error) {
            console.error(error)
        }
    }

    return [completeTodo, isLoading] as const
}

export default useCompleteTodo;