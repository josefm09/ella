import React from "react";
//import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = (props) => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/userbookings">Bookings</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/admin">Admin</a>
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            <div>Logout</div>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
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
};

export default DefaultLayout;
