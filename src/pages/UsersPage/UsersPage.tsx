import { Route, Routes } from "react-router";

import { lazy } from "react";

const AllUsersPage = lazy(() => import("./pages/AllUsers/AllUsers"));
const SingleUserPage = lazy(
  () => import("./pages/SingleUserPage/SingleUserPage")
);

const UsersRouter = () => {
  return (
    <Routes>
      <Route index element={<AllUsersPage />} />
      <Route path=":id" element={<SingleUserPage />} />
    </Routes>
  );
};

export default UsersRouter;
