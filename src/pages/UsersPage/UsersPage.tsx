import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";

import { useAppDispatch } from "shared/store";
import { fetchUsers, resetState } from "./usersSlice";

const AllUsersPage = lazy(() => import("./pages/AllUsers/AllUsers"));
const SingleUserPage = lazy(
  () => import("./pages/SingleUserPage/SingleUserPage")
);

const UsersRouter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<AllUsersPage />} />
      <Route path=":id" element={<SingleUserPage />} />
    </Routes>
  );
};

export default UsersRouter;
