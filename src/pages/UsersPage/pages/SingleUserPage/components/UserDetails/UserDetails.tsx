import { NavLink } from "react-router-dom";
import Breadcrumb from "antd/es/breadcrumb";
import Flex from "antd/es/flex";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import { Posts } from "./components";
import { UserCollapse } from "pages/UsersPage/shared/components";

import { type User } from "shared/types";
import { useAppSelector } from "shared/store";
import { selectUserById } from "pages/UsersPage/shared/slices/usersSlice";

type UserDetailsProps = {
  userId: User["id"];
};

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const user = useAppSelector((state) => selectUserById(state, userId));

  if (typeof user === "undefined") {
    return;
  }

  return (
    <Flex vertical>
      <Breadcrumb
        style={{ padding: 10, fontWeight: "bold" }}
        items={[
          {
            title: (
              <NavLink to={"/"}>
                <LeftOutlined /> User's List
              </NavLink>
            ),
          },
          {
            title: user.name,
          },
        ]}
      />
      <UserCollapse user={user} defaultActiveKey={[user.id ?? "HOME"]} />
      <Posts />
    </Flex>
  );
};

export default UserDetails;
