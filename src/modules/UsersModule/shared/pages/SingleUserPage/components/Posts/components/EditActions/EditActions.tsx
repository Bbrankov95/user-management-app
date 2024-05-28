import Button from "antd/es/button";

import UndoOutlined from "@ant-design/icons/UndoOutlined";
import FormOutlined from "@ant-design/icons/FormOutlined";


type EditActionsProps = {
    onEdit: () => void;
    onCancel: () => void;
    disabled: boolean;
}

const EditActions:React.FC<EditActionsProps> = ({onCancel,onEdit,disabled}) => {
    return  <>
     <Button
    icon={<FormOutlined />}
    disabled={disabled}
    onClick={onEdit}
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
}

export default EditActions;