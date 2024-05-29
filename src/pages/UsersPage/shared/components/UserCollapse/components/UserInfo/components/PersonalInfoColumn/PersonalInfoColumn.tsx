import { type ChangeEvent } from "react";
import { Flex } from "antd";
import { EditableField } from "pages/UsersPage/shared/components";
import { User } from "shared/types";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

type PersonalInfoColumnProps = {
  user: User;
  onColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  editMode: boolean;
};

const PersonalInfoColumn: React.FC<PersonalInfoColumnProps> = ({
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
