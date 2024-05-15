import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { userLogin } from "../../store/actions/userActions";

import Spinner from "../../components/Spinner";

import bg from "../../assets/images/off_road.svg";

export default function Login() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    dispatch(userLogin(values));
  };

  return (
    <>
      {loading === false ? (
        <section className="login-page">
          <div className="left-column">
            <div className="illustration-wrapper">
              <img alt="vestido" src={bg} />
            </div>
          </div>

          <div className="right-column">
            <Form layout="vertical" name="login-form" onFinish={onFinish}>
              <p className="form-title">Login</p>
              <hr />
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <hr />
                <Link to="/register">Click Here to Register</Link>
              </Form.Item>
            </Form>
          </div>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
}
