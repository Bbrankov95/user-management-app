import { ChangeEvent, memo, useCallback, useState, type FC } from "react";
import { useDispatch } from "react-redux";
import FormOutlined from "@ant-design/icons/FormOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import UndoOutlined from "@ant-design/icons/UndoOutlined";
import Button from "antd/es/button";
import Flex from "antd/es/flex";

import { ConfirmationModal, EditableField } from "components";
import { useAppSelector } from "store";
import { postsAPI } from "services";
import { type Post } from "types";
import {
  selectPostById,
  deletePost,
  updatePost,
} from "store/slices/postsSlice";

import classes from "./Post.module.scss";

type PostProps = {
  postId: Post["id"];
};

const Post: FC<PostProps> = memo(({ postId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const [innerPost, setInnerPost] = useState(post);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const { title, body, id } = innerPost;

  const isChanged = JSON.stringify(innerPost) !== JSON.stringify(post);

  const onChangeHandler = useCallback(
    ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) =>
      setInnerPost((prevState) => ({
        ...prevState,
        [name]: value,
      })),
    []
  );

  const onDeletePost = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await postsAPI.deletePost(id);
      if (res.status === 200) {
        dispatch(deletePost(id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, id]);

  const toggleEditMode = () => setEditMode((prevState) => !prevState);

  const onEditPost = useCallback(async () => {
    if ([title, body].some((val) => !val.trim())) return;
    setIsLoading(true);
    try {
      const res = await postsAPI.updatePost(id, innerPost);
      if (res) {
        dispatch(updatePost({ postId: id, updatedPost: innerPost }));
        toggleEditMode();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [body, dispatch, id, innerPost, title]);

  const onCancel = () => {
    setInnerPost(post);
    toggleEditMode();
  };

  const onModalCancel = () => setConfirmationModal(false);

  const onModalConfirm = () => {
    onDeletePost();
    setConfirmationModal(false);
  };

  return (
    <Flex className={classes.Post} vertical gap={10}>
      <EditableField
        label="Post Title"
        editMode={editMode}
        name="title"
        value={title}
        onEdit={onChangeHandler}
        required
      />
      <EditableField
        label="Post Body"
        editMode={editMode}
        name="body"
        value={body}
        onEdit={onChangeHandler}
        required
      />
      <Flex gap={10} justify="center">
        {editMode ? (
          <>
            <Button
              icon={<FormOutlined />}
              disabled={!isChanged}
              onClick={onEditPost}
              loading={isLoading}
            >
              Submit
            </Button>
            <Button
              danger
              type="primary"
              icon={<UndoOutlined />}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button icon={<FormOutlined />} onClick={toggleEditMode}>
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              type="primary"
              onClick={() => setConfirmationModal(true)}
              loading={isLoading}
              disabled={isLoading}
            >
              Delete
            </Button>
          </>
        )}
      </Flex>
      <ConfirmationModal
        isOpen={confirmationModal}
        onCancel={onModalCancel}
        onConfirm={onModalConfirm}
        title="Delete Post"
        body="Are you sure you want to delete this post ? "
      />
    </Flex>
  );
});

Post.displayName = "Post";
export default Post;
