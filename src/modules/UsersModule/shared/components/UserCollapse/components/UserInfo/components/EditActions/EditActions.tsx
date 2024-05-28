import {
  FormOutlined,
  UndoOutlined
} from "@ant-design/icons";
import Button from "antd/es/button";

type EditActionsProps = {
  onEdit: () => void;
  onCancel: () => void;
  disabled: boolean;
}

const EditActions: React.FC<EditActionsProps> = ({ onEdit, onCancel, disabled }) => {


  return <>
    <Button
      icon={<FormOutlined />}
      onClick={onEdit}
      type="primary"
      disabled={disabled}
    >
      Submit
    </Button>
    <Button icon={<UndoOutlined />} onClick={onCancel}>
      Cancel
    </Button>
  </>
}

export default EditActions;