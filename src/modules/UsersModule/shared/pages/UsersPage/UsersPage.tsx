import { Route, Routes } from "react-router";

import { UsersList } from "./components";

const UsersRouter = () => {
  return (
    <Routes>
      <Route index element={<UsersList />} />
    </Routes>
  );
};

export default UsersRouter;
