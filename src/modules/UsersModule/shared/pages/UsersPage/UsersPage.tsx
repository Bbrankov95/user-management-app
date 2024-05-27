import { UsersList } from "components";
import { Route, Routes } from "react-router";

const UsersRouter = () => {
  return (
    <Routes>
      <Route index element={<UsersList />} />
    </Routes>
  );
};

export default UsersRouter;
