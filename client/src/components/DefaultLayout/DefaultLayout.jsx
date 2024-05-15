import React from "react";
import { Layout, Menu } from "antd";

const { Content, Footer, Sider } = Layout;

export default function DefaultLayout(props) {
  const onMenuClick = (e) => {
    const { key } = e;
    if (key === "logout") {
      localStorage.removeItem("user");
    }
  };

  const menuItems = [
    {
      key: "home",
      label: (
        <a rel="noopener noreferrer" href="/">
          Inicio
        </a>
      ),
    },
    {
      key: "bookings",
      label: (
        <a rel="noopener noreferrer" href="/userbookings">
          Vestidos reservados
        </a>
      ),
    },
    {
      key: "admin",
      label: (
        <a rel="noopener noreferrer" href="/admin">
          Administración
        </a>
      ),
    },
    {
      key: "logout",
      label: (
        <a rel="noopener noreferrer" href="/login">
          Salir
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="content">{props.children}</div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <p>
            Ella dress rental
          </p>
        </Footer>
      </Layout>
    </Layout>
  );
}
