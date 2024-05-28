import { useState } from "react";
import { useDispatch } from "react-redux";

import { axiosInstance } from "services";
import { User } from "shared/types";

import {updateUser} from 'modules/UsersModule/shared/slices/usersSlice'

const useUpdateUser = () => {
    const [isLoading,setIsloading] = useState(false);
    const dispatch = useDispatch()

    const editUser = async (id: User['id'],updatedUser: User) => {
        setIsloading(true)
        try {
            await axiosInstance.put(`/users/${id}`,updatedUser)
            dispatch(updateUser(updatedUser))
        } catch(error) {
            console.error(error)
        } finally {
            setIsloading(false)
        }
    }
    return [editUser,isLoading] as const
}

export default useUpdateUser;