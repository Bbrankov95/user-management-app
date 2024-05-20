import { memo } from "react";
import { useLocation, useNavigate } from "react-router";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import ProductOutlined from "@ant-design/icons/ProductOutlined";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";

import classes from "./Navigation.module.scss";

const { Sider } = Layout;

const routes = {
  HOME: "/",
  TASKS: "/tasks",
};

const { HOME, TASKS } = routes;

const Navigation = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedKey] =
    Object.entries(routes).find(([, value]) => value === pathname) ?? [];

  return (
    <>
      <Sider width={200} breakpoint="md">
        <Menu
          className={classes.NavigationMenu}
          defaultSelectedKeys={[selectedKey ?? "home"]}
          theme="dark"
          mode="inline"
          items={[
            {
              key: "HOME",
              label: "Home",
              icon: <TeamOutlined style={{ fontSize: 20 }} />,
              onClick: () => navigate(HOME),
            },
            {
              key: "TASKS",
              label: "Tasks",
              icon: <ProductOutlined style={{ fontSize: 20 }} />,
              onClick: () => navigate(TASKS),
            },
          ]}
        />
      </Sider>
    </>
  );
});

Navigation.displayName = "Navigation";
export default Navigation;
