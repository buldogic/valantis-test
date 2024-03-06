import { CardItems } from "../components/card/card";
import { ButtonPagination } from "../components/buttonPagination/buttonPagination";
import { Header } from "../components/header/header";
import style from "./layout.module.css";
import { Content, Footer } from "antd/es/layout/layout";
import { Layout } from "antd";

const HomePage = () => {
  return (
    <div className={style.container}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content className={style.content}>
          <CardItems />
          <ButtonPagination />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "20px",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default HomePage;
