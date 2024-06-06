import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import Result from "antd/es/result";
import AppContainer from "./app/AppContainer";

const UsersPage = lazy(() => import("pages/UsersPage/UsersPage"));
const TasksPage = lazy(() => import("pages/TasksPage/TasksPage"));

function App() {
  return (
    <AppContainer>
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users/*" element={<UsersPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<Result.PRESENTED_IMAGE_404 />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
}

export default App;
