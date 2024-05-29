import { Flex } from "antd"
import { EditableField } from "shared/components"
import { CompassOutlined } from "@ant-design/icons";

import type { Column } from "../../shared/types";

const GeoColumn: React.FC<Column> = ({
    editMode, onColumnChange, user
}) => {
    return <Flex vertical>
        <EditableField name="lat" label="Latitude" value={user.address.geo.lat} editMode={editMode} onEdit={onColumnChange} icon={<CompassOutlined />} />
        <EditableField name="lng" label="Longitude" value={user.address.geo.lat} editMode={editMode} onEdit={onColumnChange} icon={<CompassOutlined />} />
    </Flex>
}

export default GeoColumn;