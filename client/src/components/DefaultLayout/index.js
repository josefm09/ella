import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, Row, Col } from "antd";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
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
  );

  return (
    <>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link to="/">Car Rental</Link>
                </b>
              </h1>

              <Dropdown overlay={menu} placement="bottom">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <p>
          &copy; {new Date().getFullYear()} Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Shane Le
        </p>
      </div>
    </>
  );
};

export default DefaultLayout;
