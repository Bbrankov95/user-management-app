import { type FC } from "react";
import Flex from "antd/es/flex";
import Button from "antd/es/button";
import Typography from "antd/es/typography";

import classes from "./ConfirmationModal.module.scss";

type ConfirmationModalProps = {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  body?: string;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  title = "",
  body = "",
}) => {
  if (isOpen) {
    return (
      <Flex className={classes.ModalWrapper}>
        <Flex
          className={classes.ModalContent}
          vertical
          gap={10}
          justify="center"
          align="center"
        >
          <Typography.Title level={3}>{title}</Typography.Title>
          <Typography.Text>{body}</Typography.Text>
          <Flex gap={10}>
            <Button onClick={onConfirm} danger type="primary">
              Confirm
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default ConfirmationModal;
