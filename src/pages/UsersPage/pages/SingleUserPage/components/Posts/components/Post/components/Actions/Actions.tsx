import Button from "antd/es/button";
import FormOutlined from "@ant-design/icons/FormOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

type ActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
}

const Actions:React.FC<ActionsProps> = ({
    onDelete,onEdit
}) => {
    return        <>
    <Button icon={<FormOutlined />} onClick={onEdit}>
      Edit
    </Button>
    <Button
      icon={<DeleteOutlined />}
      danger
      type="primary"
      onClick={onDelete}
    >
      Delete
    </Button>
  </>
}

export default Actions;