import { Flex } from "antd";
import { EditableField } from "components";
import { type ChangeEvent } from "react";
import { User } from "shared/types";

import { SignatureOutlined, FundProjectionScreenOutlined, BankOutlined } from '@ant-design/icons';

type CompanyColumnProps = {
    user: User;
    onColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editMode: boolean;
}

const CompanyColumn: React.FC<CompanyColumnProps> = ({ user, onColumnChange, editMode }) => {
    return <Flex flex={1} vertical>
        <EditableField label="Company Name" name="name" value={user.company.name} onEdit={onColumnChange} editMode={editMode} icon={<BankOutlined />} />
        <EditableField label="Catch Phrase" name="catchPhrase" value={user.company.catchPhrase} onEdit={onColumnChange} editMode={editMode} icon={<SignatureOutlined />} />
        <EditableField label="Business" name="bs" value={user.company.bs} onEdit={onColumnChange} editMode={editMode} icon={<FundProjectionScreenOutlined />} />
    </Flex>
}

export default CompanyColumn;