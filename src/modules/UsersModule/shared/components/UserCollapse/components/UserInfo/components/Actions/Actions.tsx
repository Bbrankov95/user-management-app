import { useParams } from "react-router";
import {
  FormOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Button from "antd/es/button";

type ActionsProps = {
  onSeePosts: () => void;
  onEdit: () => void
}

const Actions: React.FC<ActionsProps> = ({ onEdit, onSeePosts }) => {
  const { id: userId } = useParams();

  return <>
    {!userId ?
      <Button
        icon={<MessageOutlined />}
        onClick={onSeePosts}
        type="primary"
      >
        See Posts
      </Button> : null}
    <Button icon={<FormOutlined />} onClick={onEdit}>
      Edit
    </Button>
  </>
}

export default Actions;