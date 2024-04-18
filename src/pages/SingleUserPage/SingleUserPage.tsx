import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import Breadcrumb from "antd/es/breadcrumb";
import LeftOutlined from "@ant-design/icons/LeftOutlined";

import { Posts, UserCollapse } from "components";
import { usersAPI } from "services";
import { useAppSelector } from "store";
import { insertUsers, selectUserById } from "store/slices/usersSlice";
import { disposePosts } from "store/slices/postsSlice";
import { NavLink } from "react-router-dom";

const SingleUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams() ?? {};
  const user = useAppSelector((state) => selectUserById(state, Number(id)));

  const getUser = useCallback(async () => {
    try {
      if (id) {
        const user = (await usersAPI.getUserById(Number(id))).data;
        if (user) {
          dispatch(insertUsers([user]));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);

  useEffect(() => {
    return () => {
      dispatch(disposePosts());
    };
  }, [dispatch]);

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
        <UserCollapse userId={Number(id)} defaultActiveKey={[id ?? 0]} />
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
