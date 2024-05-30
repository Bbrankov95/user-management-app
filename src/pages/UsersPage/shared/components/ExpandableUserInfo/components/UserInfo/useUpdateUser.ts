import { useState } from "react";
import { useDispatch } from "react-redux";

import { axiosInstance } from "services";
import { User } from "shared/types";

import { updateUser } from 'pages/UsersPage/usersSlice'

const useUpdateUser = () => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch()

    const editUser = async (id: User['id'], updatedUser: User) => {
        setIsPending(true)
        try {
            await axiosInstance.put(`/users/${id}`, updatedUser)
            dispatch(updateUser(updatedUser))
        } catch (error) {
            console.error(error)
        } finally {
            setIsPending(false)
        }
    }
    return [editUser, isPending] as const
}

export default useUpdateUser;