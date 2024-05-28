import { useState } from "react"
import { useDispatch } from "react-redux";

import { Task } from "shared/types";
import {completeTask} from '../slices/tasksSlice'

const useCompleteTodo = () => {
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const completeTodo = (id: Task['id']) => {
        setIsLoading(true)
        try {
            dispatch(completeTask(id))
        } catch(error) {
            console.error(error)
        }
    }

    return [completeTodo,isLoading] as const
}

export default useCompleteTodo;