import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { userRegister } from "../../store/actions/userActions";

import Spinner from "../../components/Spinner";

import bg from "../../assets/images/off_road.svg";

export default function Register() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    dispatch(userRegister(values));
  };

  return (
    <>
      {loading === false ? (
        <div className="login-page">
          <div className="left-column">
            <div className="illustration-wrapper">
              <img alt="vestido" src={bg} />
            </div>
          </div>

          <div className="right-column">
            <Form layout="vertical" name="login-form" onFinish={onFinish}>
              <p className="form-title">Registro</p>
              <hr />
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingresa tu nombre de usuario",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Usuario"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingresa tu contraseña",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Registrarse
                </Button>
                <hr />
                <Link to="/login">Click aquí para ir al formulario de acceso</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
