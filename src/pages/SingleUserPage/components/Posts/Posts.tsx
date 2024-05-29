import { useParams } from "react-router";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Empty from "antd/es/empty";

import { Post as UserPost } from "./components";
import { useFetchPosts } from "./hooks/";
import type { Post } from "./types/index";

const Posts = () => {
  const { id } = useParams();
  const [posts = []] = useFetchPosts(Number(id));

  return (
    <Flex vertical flex={1} gap={10} justify="center" align="center">
      <Typography.Title level={4}>User Post's</Typography.Title>
      {posts.length > 0 ? (
        posts.map((post: Post) => <UserPost key={post.id} post={post} />)
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default Posts;
