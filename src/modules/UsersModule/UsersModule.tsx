import { Navigate, Route, Routes } from "react-router";
import { Result } from "antd";

import { SingleUserPage, UsersPage } from "./shared/pages";

type Page = {
  name: string;
  path: string;
};

const pages: Page[] = [
  {
    name: "Users",
    path: "all",
  },
  {
    name: "Single User",
    path: ":id",
  },
] as const;

const renderPage = (page: Page) => {
  switch (page.name) {
    case "Users":
      return <UsersPage />;
    case "Single User":
      return <SingleUserPage />;
    default:
      return <Result.PRESENTED_IMAGE_404 />;
  }
};

const UsersModule = () => {
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

export default UsersModule;
