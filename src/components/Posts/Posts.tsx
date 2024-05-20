import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Empty from "antd/es/empty";

import { postsAPI } from "services";
import { useAppSelector } from "store";
import { Post } from "types";
import { insertPosts, selectPostsAllIds } from "store/slices/postsSlice";

import { Post as UserPost } from "./components";

const Posts = () => {
  const dispatch = useDispatch();
  const postsAllIds = useAppSelector(selectPostsAllIds);
  const { id } = useParams() ?? {};

  const getPosts = useCallback(async () => {
    try {
      if (id) {
        const posts = await (
          await postsAPI.getUserPostsByUserId(Number(id))
        ).data;
        dispatch(insertPosts(posts));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Flex vertical flex={1} gap={10} justify="center" align="center">
      <Typography.Title level={4}>User Post's</Typography.Title>
      {postsAllIds.length > 0 ? (
        postsAllIds.map((postId: Post["id"]) => (
          <UserPost key={postId} postId={postId} />
        ))
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default Posts;
