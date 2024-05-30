import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "antd/es/breadcrumb";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import { useAppSelector } from "shared/store";
import { selectUserById } from "pages/UsersPage/usersSlice";

const UserBreadcrumb = () => {
  const { id: userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  if (!user) {
    return null;
  }

  return (
    <Breadcrumb
      style={{ padding: 10, fontWeight: "bold" }}
      items={[
        {
          title: (
            <NavLink to={"/users"}>
              <LeftOutlined /> User's List
            </NavLink>
          ),
        },
        {
          title: user.name,
        },
      ]}
    />
  );
};

export default UserBreadcrumb;
