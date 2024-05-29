import { Navigation } from "./containers";

import Layout from "antd/es/layout";

const { Content } = Layout;

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      style={{
        display: "flex",
        minHeight: "100dvh",
        width: "100dvw",
      }}
    >
      <Navigation />
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppContainer;
