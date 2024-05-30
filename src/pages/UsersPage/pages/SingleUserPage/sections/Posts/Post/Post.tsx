import { useCallback, useState, type FC, type ChangeEvent } from "react";
import Flex from "antd/es/flex";

import { EditableField } from "pages/UsersPage/shared/components";
import type { Post as UserPost } from "../types";
import { ConfirmationModal, Actions, EditActions } from "./components";
import useDeletePost from "./useDeletePost";
import useUpdatePost from "./useUpdatePost";

import classes from "./Post.module.scss";

type PostProps = {
  post: UserPost;
};

const Post: FC<PostProps> = ({ post }) => {
  const [innerPost, setInnerPost] = useState(post);
  const [editMode, setEditMode] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [updatePost, isUpdatePending] = useUpdatePost();
  const [deletePost] = useDeletePost();
  const { title, body, id: postId } = innerPost;

  const isChanged = JSON.stringify(innerPost) !== JSON.stringify(post);

  const onChangeHandler = useCallback(
    ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) =>
      setInnerPost((prevState) => ({
        ...prevState,
        [name]: value,
      })),
    []
  );

  const toggleEditMode = () => setEditMode((prevState) => !prevState);

  const onCancel = () => {
    setInnerPost(post);
    toggleEditMode();
  };

  const onEdit = () => {
    updatePost(postId, innerPost);
    setEditMode(false);
  };

  const onModalCancel = () => setConfirmationModal(false);

  const onModalConfirm = () => {
    deletePost(postId);
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
          <EditActions
            disabled={!isChanged || (!isChanged && isUpdatePending)}
            onEdit={onEdit}
            onCancel={onCancel}
          />
        ) : (
          <Actions
            onEdit={toggleEditMode}
            onDelete={() => setConfirmationModal(true)}
          />
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
};

Post.displayName = "Post";
export default Post;
