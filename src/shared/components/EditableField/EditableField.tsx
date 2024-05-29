import { ChangeEvent, memo, type FC } from "react";
import { WarningOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Input from "antd/es/input";

type EditableFieldProps = {
  editMode?: boolean;
  value: string;
  onEdit?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  required?: boolean;
  icon?: JSX.Element;
};

const EditableField: FC<EditableFieldProps> = memo(
  ({
    editMode,
    value = "Editable Field",
    onEdit,
    label,
    name,
    required,
    icon,
  }) => {
    const inputStatus = required && value.length < 1 ? "error" : undefined;
    const isStatusError = inputStatus === "error";

    return (
      <Flex vertical>
        {label ? (
          <Typography.Text style={{ fontSize: "1.05rem" }} strong>
            {icon} {label}
          </Typography.Text>
        ) : null}
        {editMode ? (
          <Input
            status={inputStatus}
            name={name}
            value={value}
            onChange={onEdit}
            placeholder={isStatusError ? "This field is required." : ""}
            prefix={isStatusError ? <WarningOutlined color="red" /> : undefined}
          />
        ) : (
          <Typography.Paragraph>{value || "N/A"}</Typography.Paragraph>
        )}
      </Flex>
    );
  }
);

EditableField.displayName = "EditableField";
export default EditableField;
