import { ChangeEvent,  useCallback, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import {
  BankOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  FieldNumberOutlined,
  FormOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  SignatureOutlined,
  UndoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Flex from "antd/es/flex";
import Button from "antd/es/button";

import { EditableField } from "components";
import { User } from "shared/types";
import useUpdateUser from "modules/UsersModule/shared/hooks/useUpdateUser";

type UserInfoProps = {
  user: User;
};

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [innerUser, setInnerUser] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const {
    id,
    name,
    phone,
    email,
    website,
    address: {
      city,
      geo: { lat, lng },
      street,
      suite,
      zipcode,
    },
    company: { bs, catchPhrase, name: companyName },
  } = innerUser ?? {};
  const { id: userId } = useParams() ?? {};
  const [updatedUser,isLoading] = useUpdateUser()
  const isChanged = JSON.stringify(innerUser) !== JSON.stringify(user);
  const shouldDisableSubmit = !isChanged || isLoading;

  const toggleEditMode = () => setEditMode((prevState) => !prevState);

  const onEditUser = async () => {
    updatedUser(Number(userId ? userId : id),innerUser)
    toggleEditMode()
  };

  const onCancel = () => {
    setInnerUser(user);
    toggleEditMode();
  };

  const onPersonalInfoChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setInnerUser((prevState) => ({
        ...prevState,
        [name]: value,
      })),
    []
  );

  const onAddressInfoChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setInnerUser((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [name]: value },
      })),
    []
  );

  const onCompanyInfoChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setInnerUser((prevState) => ({
        ...prevState,
        company: { ...prevState.company, [name]: value },
      })),
    []
  );

  const onGeoInfoChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setInnerUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          geo: { ...prevState.address.geo, [name]: value },
        },
      })),
    []
  );

  const onSeePostsHandler = () => navigate(`/users/${user.id}`);

  const userInfoFields = [
    {
      name: "name",
      value: name,
      label: "Username",
      required: true,
      icon: <UserOutlined />,
    },
    {
      name: "email",
      value: email,
      label: "Email",
      required: true,
      icon: <MailOutlined />,
    },
    {
      name: "phone",
      value: phone,
      label: "Phone",
      icon: <PhoneOutlined />,
    },
    {
      name: "website",
      value: website,
      label: "Website",
      icon: <GlobalOutlined />,
    },
  ];

  const companyInfoFIelds = [
    {
      name: "name",
      value: companyName,
      label: "Company Name",
      icon: <BankOutlined />,
    },
    {
      name: "name",
      value: catchPhrase,
      label: "Catch Phrase",
      icon: <SignatureOutlined />,
    },
    {
      name: "bs",
      value: bs,
      label: "Business",
      icon: <FundProjectionScreenOutlined />,
    },
  ];

  const geoInfoFields = [
    { name: "lng", value: lng, label: "Longitude", icon: <CompassOutlined /> },
    { name: "lat", value: lat, label: "Latitude", icon: <CompassOutlined /> },
  ];

  const addressInfoFields = [
    {
      name: "city",
      value: city,
      label: "City",
      icon: <HomeOutlined />,
      required: true,
    },
    {
      name: "street",
      value: street,
      label: "Street",
      icon: <EnvironmentOutlined />,
      required: true,
    },
    {
      name: "suite",
      value: suite,
      label: "Suite",
      icon: <FieldNumberOutlined />,
      required: true,
    },
    { name: "zipcode", value: zipcode, label: "Zip Code" },
  ];

  return (
    <Flex gap={10}>
      <Flex vertical flex={1}>
        {userInfoFields.map(({ icon, label, name, required, value }) => (
          <EditableField
            key={`${name}-${label}`}
            value={value}
            label={label}
            name={name}
            required={required}
            icon={icon}
            editMode={editMode}
            onEdit={onPersonalInfoChange}
          />
        ))}
      </Flex>
      <Flex vertical flex={1}>
        <Flex vertical>
          {addressInfoFields.map(({ icon, label, name, required, value }) => (
            <EditableField
              key={`${name}=${label}`}
              value={value}
              label={label}
              name={name}
              required={required}
              icon={icon}
              editMode={editMode}
              onEdit={onAddressInfoChange}
            />
          ))}
        </Flex>
        {geoInfoFields.map(({ icon, label, name, value }) => (
          <EditableField
            key={`${name}=${label}`}
            value={value}
            label={label}
            name={name}
            icon={icon}
            onEdit={onGeoInfoChange}
            editMode={editMode}
          />
        ))}
      </Flex>
      <Flex vertical flex={1}>
        {companyInfoFIelds.map(({ icon, label, name, value }) => (
          <EditableField
            key={`${name}=${label}`}
            value={value}
            label={label}
            name={name}
            icon={icon}
            onEdit={onCompanyInfoChange}
            editMode={editMode}
          />
        ))}
      </Flex>
      <Flex vertical>
        {editMode ? (
          <>
            <Button
              icon={<FormOutlined />}
              disabled={shouldDisableSubmit}
              onClick={onEditUser}
              type="primary"
              loading={isLoading}
            >
              Submit
            </Button>
            <Button icon={<UndoOutlined />} onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {!userId ? (
              <Button
                icon={<MessageOutlined />}
                onClick={onSeePostsHandler}
                type="primary"
              >
                See Posts
              </Button>
            ) : null}
            <Button icon={<FormOutlined />} onClick={toggleEditMode}>
              Edit
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

UserInfo.displayName = "UserInfo";
export default UserInfo;
