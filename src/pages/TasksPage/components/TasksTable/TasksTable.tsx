import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Flex from "antd/es/flex";
import Table from "antd/es/table";
import { useAppSelector } from "shared/store";
import { axiosInstance } from "services";
import {
    fetchTasksFailure,
    fetchTasksSuccess,
    selectTasks,
    resetState,
    fetchTasksInit,
} from "../../tasksSlice"
import { mapTaskWithUser, createUserFilterOptions } from "./utils";
import columns from "./columns";

const TasksTable = () => {
    const { data: tasks } = useAppSelector(selectTasks);
    const [filterOptionByOwner, setFilterOptionByOwner] = useState<{ value: number, text: string }[]>([])
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchTasksInit());
            try {
                const [{ data: tasks }, { data: users }] = await Promise.all([
                    axiosInstance.get("/todos"),
                    axiosInstance.get("/users"),
                ]);
                const filterOptionByOwner = createUserFilterOptions(users)
                setFilterOptionByOwner(filterOptionByOwner)
                const mappedTasks = mapTaskWithUser({ tasks, users });
                dispatch(fetchTasksSuccess(mappedTasks));
            } catch (error) {
                dispatch(fetchTasksFailure(error));
            }
        };
        fetchData();

        return () => {
            dispatch(resetState());
        };
    }, [dispatch]);

    return <Flex vertical flex={1}>
        <Table
            rowHoverable
            bordered
            dataSource={tasks}
            columns={columns(filterOptionByOwner)}
            pagination={{ pageSizeOptions: [] }}
        />
    </Flex>
}

export default TasksTable;