import { ChangeEvent, useCallback, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import Flex from "antd/es/flex";

import type { User } from "shared/types";
import useUpdateUser from "./useUpdateUser";
import {
  PersonalInfoColumn,
  AddressColumn,
  CompanyColumn,
  GeoColumn,
  Actions,
  EditActions,
} from "./components";
import { Collapse } from "antd";

type UserInfoProps = {
  user: User;
};

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [innerUser, setInnerUser] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { id: userId } = useParams() ?? {};
  const [updatedUser, isLoading] = useUpdateUser();
  const isChanged = JSON.stringify(innerUser) !== JSON.stringify(user);
  const shouldDisableSubmit = !isChanged || (!isChanged && isLoading);

  const toggleEditMode = () => setEditMode((prevState) => !prevState);

  const onEditUser = async () => {
    updatedUser(Number(userId ? userId : innerUser.id), innerUser);
    toggleEditMode();
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
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setInnerUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          geo: { ...prevState.address.geo, [name]: value },
        },
      }));
    },
    []
  );

  const onSeePostsHandler = () => navigate(`/users/${user.id}`);

  return (
    <Collapse
      style={{
        fontSize: "1rem",
        width: "100%",
        padding: 10,
        userSelect: "none",
      }}
      size="middle"
      defaultActiveKey={userId ? userId : undefined}
      items={[
        {
          label: user.name,
          key: user.id,
          children: [
            <Flex gap={10} flex={1}>
              <PersonalInfoColumn
                editMode={editMode}
                user={innerUser}
                onColumnChange={onPersonalInfoChange}
              />
              <Flex vertical flex={1}>
                <AddressColumn
                  editMode={editMode}
                  user={innerUser}
                  onColumnChange={onAddressInfoChange}
                />
                <GeoColumn
                  editMode={editMode}
                  user={innerUser}
                  onColumnChange={onGeoInfoChange}
                />
              </Flex>
              <CompanyColumn
                editMode={editMode}
                user={innerUser}
                onColumnChange={onCompanyInfoChange}
              />
              <Flex vertical>
                {editMode ? (
                  <EditActions
                    disabled={shouldDisableSubmit}
                    onCancel={onCancel}
                    onEdit={onEditUser}
                  />
                ) : (
                  <Actions
                    onEdit={toggleEditMode}
                    onSeePosts={onSeePostsHandler}
                  />
                )}
              </Flex>
            </Flex>,
          ],
        },
      ]}
    />
  );
};

UserInfo.displayName = "UserInfo";
export default UserInfo;
