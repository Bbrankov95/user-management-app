import { useState } from "react";
import { axiosInstance } from "services";

import { Post } from "pages/SingleUserPage/components/Posts/types";

const useDeletePost = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deletePost = async (postId: Post['id']) => {
        setIsLoading(true)
        try {
            await axiosInstance.delete(`/posts/${postId}`);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return [deletePost, isLoading] as const;
}

export default useDeletePost;
