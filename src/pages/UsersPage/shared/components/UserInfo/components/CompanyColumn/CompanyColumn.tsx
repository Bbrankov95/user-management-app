import { Flex } from "antd";
import {
  SignatureOutlined,
  FundProjectionScreenOutlined,
  BankOutlined,
} from "@ant-design/icons";

import { EditableField } from "pages/UsersPage/shared/components";
import type { Column } from "../../types";

const CompanyColumn: React.FC<Column> = ({
  user,
  onColumnChange,
  editMode,
}) => {
  return (
    <Flex flex={1} vertical>
      <EditableField
        label="Company Name"
        name="name"
        value={user.company.name}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<BankOutlined />}
      />
      <EditableField
        label="Catch Phrase"
        name="catchPhrase"
        value={user.company.catchPhrase}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<SignatureOutlined />}
      />
      <EditableField
        label="Business"
        name="bs"
        value={user.company.bs}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<FundProjectionScreenOutlined />}
      />
    </Flex>
  );
};

export default CompanyColumn;
