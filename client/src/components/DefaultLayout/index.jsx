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
          Home
        </a>
      ),
    },
    {
      key: "bookings",
      label: (
        <a rel="noopener noreferrer" href="/userbookings">
          Bookings
        </a>
      ),
    },
    {
      key: "admin",
      label: (
        <a rel="noopener noreferrer" href="/admin">
          Admin
        </a>
      ),
    },
    {
      key: "logout",
      label: (
        <a rel="noopener noreferrer" href="/login">
          Logout
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
            &copy; {new Date().getFullYear()} Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Shane Le
          </p>
        </Footer>
      </Layout>
    </Layout>
  );
}
