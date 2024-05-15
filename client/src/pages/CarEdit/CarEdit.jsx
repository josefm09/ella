import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input, Select, Button } from "antd";

import { editCar, getAllCars } from "../../store/actions/carsActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { Option } = Select;

export default function CarEdit({ match }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);
  const { vestidos } = useSelector((state) => state.carsReducer);

  const [vestido, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    if (vestidos.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(vestidos);
      setCar(vestidos.find((o) => o._id === match.params.carid));
      console.log(vestido);
    }
  }, [vestidos]);

  const onFinish = (values) => {
    values._id = vestido._id;

    dispatch(editCar(values));
    console.log(values);
  };

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
              {totalCars.length > 0 && (
                <Form initialValues={vestido} layout="vertical" onFinish={onFinish}>
                  <h3>Edit Vestido</h3>
                  <hr />
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="talla"
                    label="Talla"
                    rules={[{ required: true }]}
                  >
                    <Select
                      name="talla"
                      placeholder="Please select vestido talla."
                    >
                      <Option value="Automatic">Automatic</Option>
                      <Option value="Manual">Manual</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="seats"
                    label="Seats"
                    rules={[{ required: true }]}
                  >
                    <Select
                      name="seats"
                      placeholder="Please select vestido seats amount."
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
                    name="costPerDay"
                    label="Cost Per Hour"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="button-group">
                    <Button type="danger" href="/admin">
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Edit Vestido
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </DefaultLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
}
