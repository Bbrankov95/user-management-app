import { Navigate, Route, Routes } from "react-router";
import Layout from "antd/es/layout";

import { Navigation } from "components";

import classes from "./App.module.scss";
import { Result } from "antd";
import { Suspense, lazy } from "react";

const { Content } = Layout;

type Module = {
  name: string;
  path: string;
};

const modules: Module[] = [
  {
    name: "Users",
    path: "/users",
  },
  { name: "Tasks", path: "/tasks" },
] as const;

const UsersModule = lazy(() => import("./modules/UsersModule/UsersModule"));
const TasksModule = lazy(() => import("./modules/TasksModule/TasksModule"));

const renderModule = (module: Module) => {
  switch (module.name) {
    case "Users":
      return <UsersModule />;
    case "Tasks":
      return <TasksModule />;
    default:
      return <Result.PRESENTED_IMAGE_404 />;
  }
};

function App() {
  return (
    <Layout className={classes.App}>
      <Navigation />
      <Content>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={modules[0].path} replace />}
            />
            {modules.map((module) => (
              <Route
                key={module.name}
                path={module.path + "/*"}
                element={renderModule(module)}
              />
            ))}
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
