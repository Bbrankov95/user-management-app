import { Flex } from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";

import { EditableField } from "pages/UsersPage/shared/components";
import type { Column } from "../../types";

const AddressColumn: React.FC<Column> = ({
  onColumnChange,
  user,
  editMode,
}) => {
  return (
    <Flex flex={1} vertical>
      <EditableField
        name="city"
        label="City"
        value={user.address.city}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<HomeOutlined />}
      />
      <EditableField
        name="street"
        label="Street"
        value={user.address.street}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<EnvironmentOutlined />}
      />
      <EditableField
        name="suite"
        label="Suite"
        value={user.address.suite}
        onEdit={onColumnChange}
        editMode={editMode}
        icon={<FieldNumberOutlined />}
      />
      <EditableField
        name="zipcode"
        label="Zip Code"
        value={user.address.zipcode}
        onEdit={onColumnChange}
        editMode={editMode}
      />
    </Flex>
  );
};

export default AddressColumn;
