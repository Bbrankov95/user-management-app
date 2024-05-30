import { Flex } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { EditableField } from "pages/UsersPage/shared/components";
import type { Column } from "../../types";

const PersonalInfoColumn: React.FC<Column> = ({
  user,
  onColumnChange,
  editMode,
}) => {
  return (
    <Flex flex={1} vertical>
      <EditableField
        label="Username"
        name="name"
        value={user.name}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<UserOutlined />}
      />
      <EditableField
        label="Email"
        name="email"
        value={user.email}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<MailOutlined />}
      />
      <EditableField
        label="Phone"
        name="phone"
        value={user.phone}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<PhoneOutlined />}
      />
      <EditableField
        label="Website"
        name="website"
        value={user.website}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<GlobalOutlined />}
      />
    </Flex>
  );
};

export default PersonalInfoColumn;
