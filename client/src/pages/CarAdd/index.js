import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input, Select, Button } from "antd";

import { addCar } from "../../store/actions/carsActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { Option } = Select;

const CarAdd = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    values.bookedTimeSlots = [];

    dispatch(addCar(values));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
            <hr />
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="transmission"
              label="Transmission"
              rules={[{ required: true }]}
            >
              <Select
                name="transmission"
                placeholder="Please select car transmission."
              >
                <Option value="Automatic">Automatic</Option>
                <Option value="Manual">Manual</Option>
              </Select>
            </Form.Item>
            <Form.Item name="seats" label="Seats" rules={[{ required: true }]}>
              <Select
                name="seats"
                placeholder="Please select car seats amount."
              >
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="costPerHour"
              label="Cost Per Hour"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <Button type="primary">Add Car</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default CarAdd;
