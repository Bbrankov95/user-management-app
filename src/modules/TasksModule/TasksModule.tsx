import { Navigate, Route, Routes } from "react-router";
import { Result } from "antd";

import { TasksPage } from "./shared/pages";
import type { Page } from 'shared/types'

const pages: Page[] = [
  {
    name: "Tasks",
    path: "all",
  },
] as const;

const renderPage = (page: Page) => {
  switch (page.name) {
    case "Tasks":
      return <TasksPage />;
    default:
      return <Result.PRESENTED_IMAGE_404 />;
  }
};

const TasksModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={pages[0].path} replace />} />
      {pages.map((page) => (
        <Route key={page.name} path={page.path} element={renderPage(page)} />
      ))}
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default TasksModule;
