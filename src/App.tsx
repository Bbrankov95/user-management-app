import { Route, Routes } from "react-router";
import Layout from "antd/es/layout";

import { UsersList, Navigation } from "components";
import { SingleUserPage, TasksPage } from "pages";

import classes from "./App.module.scss";

const { Content } = Layout;

function App() {
  return (
    <Layout className={classes.App}>
      <Navigation />
      <Content>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/users/:id" element={<SingleUserPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
