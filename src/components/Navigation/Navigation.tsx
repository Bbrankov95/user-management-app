import { memo } from "react";
import { useNavigate } from "react-router";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import ProductOutlined from "@ant-design/icons/ProductOutlined";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";

import classes from "./Navigation.module.scss";

const { Sider } = Layout;

const Navigation = memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <Sider width={200} breakpoint="md">
        <Menu
          className={classes.NavigationMenu}
          defaultSelectedKeys={["home"]}
          theme="dark"
          mode="inline"
          items={[
            {
              key: "home",
              label: "Home",
              icon: <TeamOutlined style={{ fontSize: 20 }} />,
              onClick: () => navigate("/"),
            },
            {
              key: "tasks",
              label: "Tasks",
              icon: <ProductOutlined style={{ fontSize: 20 }} />,
              onClick: () => navigate("/tasks"),
            },
          ]}
        />
      </Sider>
    </>
  );
});

Navigation.displayName = "Navigation";
export default Navigation;
