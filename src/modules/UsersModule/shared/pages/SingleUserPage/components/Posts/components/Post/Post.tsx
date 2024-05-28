import { ChangeEvent, memo, useCallback, useState, type FC } from "react";
import FormOutlined from "@ant-design/icons/FormOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import Button from "antd/es/button";
import Flex from "antd/es/flex";

import { ConfirmationModal, EditableField } from "components";
import classes from "./Post.module.scss";
import { Post as UserPost } from "modules/UsersModule/shared/types";
import useUpdatePost from "../../../../shared/hooks/useUpdatePost";
import useDeletePost from "../../../../shared/hooks/useDeletePost";
import EditActions from "../EditActions/EditActions";

type PostProps = {
  post: UserPost
};

const Post: FC<PostProps> = memo(({post}) => {
  const [innerPost, setInnerPost] = useState(post);
  const [editMode, setEditMode] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [updatePost, isUpdatePending] = useUpdatePost();
  const [deletePost, isDeletePending] = useDeletePost();
  const { title, body,id: postId } = innerPost;

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
    updatePost(postId,innerPost)
    setEditMode(false)
  }

  const onModalCancel = () => setConfirmationModal(false);

  const onModalConfirm = () => {
    deletePost(postId)
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
         <EditActions disabled={!isChanged || isUpdatePending} onEdit={onEdit} onCancel={onCancel}/>
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
              disabled={isDeletePending}
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
