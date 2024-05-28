import { type ChangeEvent } from "react";
import { Flex } from "antd";
import { EditableField } from "components";
import type { User } from 'shared/types'
import { HomeOutlined, EnvironmentOutlined, FieldNumberOutlined } from "@ant-design/icons";

type AdressColumnProps = {
    user: User;
    onColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editMode: boolean;
}

const AdressColumn: React.FC<AdressColumnProps> = ({ onColumnChange, user, editMode }) => {
    return <Flex flex={1} vertical>
        <EditableField name="city" label="City" value={user.address.city} onEdit={onColumnChange} editMode={editMode} icon={<HomeOutlined />} />
        <EditableField name="street" label="Street" value={user.address.street} onEdit={onColumnChange} editMode={editMode} icon={<EnvironmentOutlined />} />
        <EditableField name="suite" label="Suite" value={user.address.suite} onEdit={onColumnChange} editMode={editMode} icon={<FieldNumberOutlined />} />
        <EditableField name="zipcode" label="Zip Code" value={user.address.zipcode} onEdit={onColumnChange} editMode={editMode} />
    </Flex>
}

export default AdressColumn;