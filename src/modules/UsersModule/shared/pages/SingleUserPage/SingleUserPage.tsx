import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import Breadcrumb from "antd/es/breadcrumb";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import Spin from "antd/es/spin";

import { UserCollapse } from "modules/UsersModule/shared/components";
import useFetchUser from "./shared/hooks/useFetchUser";

import { useAppSelector } from "shared/store";
import { Posts } from "./components";
import { fetchUsersSuccess, selectUserById, selectUsers } from "../../slices/usersSlice";

const SingleUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() ?? {};
  const [fetchUser, isLoading] = useFetchUser(Number(id));
  const user = useAppSelector(state => selectUserById(state, Number(id)))
  const { hasFetched } = useAppSelector(selectUsers)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasFetched) {
      const insertUser = async () => {
        const user = await fetchUser()
        dispatch(fetchUsersSuccess([user]))
      }
      insertUser()
    }
  }, [user])

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (user) {
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
        <UserCollapse user={user} defaultActiveKey={[id ?? "HOME"]} />
        <Posts />
      </Flex>
    );
  }

  return (
    <Flex vertical flex={1} justify="center" align="center">
      <Typography.Text>No user found with that id !</Typography.Text>
      <Button onClick={() => navigate("/")} type="primary">
        Go Home
      </Button>
    </Flex>
  );
};

export default SingleUserPage;
