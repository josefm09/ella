import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input, Select, Button } from "antd";

import { editVestido, getAllVestidos } from "../../store/actions/vestidosActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { Option } = Select;

export default function VestidoEdit({ match }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);
  const { vestidos } = useSelector((state) => state.vestidosReducer);

  const [vestido, setVestido] = useState();
  const [totalVestidos, setTotalVestidos] = useState([]);

  useEffect(() => {
    if (vestidos.length === 0) {
      dispatch(getAllVestidos());
    } else {
      setTotalVestidos(vestidos);
      setVestido(vestidos.find((o) => o._id === match.params.carid));
      console.log(vestido);
    }
  }, [vestidos]);

  const onFinish = (values) => {
    values._id = vestido._id;

    dispatch(editVestido(values));
    console.log(values);
  };

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <Row justify="center">
            <Col lg={12} sm={24} xs={24}>
              {totalVestidos.length > 0 && (
                <Form initialValues={vestido} layout="vertical" onFinish={onFinish}>
                  <h3>Editar Vestido</h3>
                  <hr />
                  <Form.Item
                    name="name"
                    label="Nombre"
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
                      <Option value="XS">XS</Option>
                      <Option value="S">S</Option>
                      <Option value="M">M</Option>
                      <Option value="L">L</Option>
                      <Option value="XL">XL</Option>
                      <Option value="XXL">XXL</Option>
                    </Select>
                  </Form.Item>
                  {/* <Form.Item
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
                  </Form.Item> */}
                  <Form.Item
                    name="image"
                    label="Link de la imagen del vestido"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="costPerDay"
                    label="Costo por día"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="button-group">
                    <Button type="danger" href="/admin">
                      Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Editar Vestido
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
