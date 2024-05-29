import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "antd/es/layout";
import Result from "antd/es/result";

import { Navigation } from "components";

import classes from "./App.module.scss";

const { Content } = Layout;

const UsersPage = lazy(() => import("pages/UsersPage/UsersPage"));
const SingleUserPage = lazy(() => import("pages/SingleUserPage/SingleUserPage"));
const TasksPage = lazy(() => import("pages/TasksPage/TasksPage"));

function App() {
  return (
    <Layout className={classes.App}>
      <Navigation />
      <Content>
        <Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<SingleUserPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="*" element={<Result.PRESENTED_IMAGE_404 />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
