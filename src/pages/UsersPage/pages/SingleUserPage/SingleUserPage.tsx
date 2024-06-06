import Spin from "antd/es/spin";

import { useAppSelector } from "shared/store";
import { selectUsers } from "pages/UsersPage/usersSlice";
import { UserBreadcrumb, UserDetails, Posts } from "./sections";

const SingleUserPage = () => {
  const { loading: isLoading } = useAppSelector(selectUsers);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <UserBreadcrumb />
      <UserDetails />
      <Posts />
    </>
  );
};

export default SingleUserPage;
