import { memo, type FC } from "react";
import Collapse, { type CollapseProps } from "antd/es/collapse";

import { User } from "shared/types";
import { UserInfo } from "./components";

type UserCollapseProps = {
  user: User;
  defaultActiveKey?: CollapseProps["defaultActiveKey"];
};

const UserCollapse: FC<UserCollapseProps> = memo(
  ({ user, defaultActiveKey }) => {
    const { id, name } = user ?? {};

    const items = [
      {
        key: id,
        label: name,
        children: <UserInfo user={user} />,
      },
    ];

    return (
      <Collapse
        style={{
          fontSize: "1rem",
          width: "100%",
          padding: 10,
        }}
        size="middle"
        items={items}
        defaultActiveKey={defaultActiveKey}
      />
    );
  }
);

UserCollapse.displayName = "UserCollapse";
export default UserCollapse;
