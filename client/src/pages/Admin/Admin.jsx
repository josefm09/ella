import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button, Popconfirm, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { deleteCar, getAllVestidos } from "../../store/actions/vestidosActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

export default function Admin() {
  const dispatch = useDispatch();

  const { vestidos } = useSelector((state) => state.vestidosReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [totalVestidos, setTotalVestidos] = useState([]);

  useEffect(() => {
    dispatch(getAllVestidos());
  }, []);

  useEffect(() => {
    setTotalVestidos(vestidos);
  }, [vestidos]);

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <Row justify="center" gutter={16} className="mt-2">
            <Col lg={20} sm={24}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mt-1 mr-2">Panel administrativo</h3>
                <Button type="primary" href="/addvestido">
                  Agregar Vestido
                </Button>
              </div>
            </Col>
          </Row>

          <Row justify="center" gutter={16}>
            {totalVestidos?.map((vestido) => {
              return (
                <Col key={vestido._id} lg={5} sm={20} xs={24}>
                  <Card
                    title={vestido.name}
                    style={{
                      width: 300,
                    }}
                    cover={<img alt={vestido.name} src={vestido.image} />}
                    actions={[
                      <Link to={`/editvestido/${vestido._id}`}>
                        <EditOutlined
                          key="edit"
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </Link>,
                      <Popconfirm
                        title="Estás seguro que deseas eliminar el vestido?"
                        onConfirm={() => {
                          dispatch(deleteCar({ carid: vestido._id }));
                        }}
                        okText="Si"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          key="delete"
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </Popconfirm>,
                    ]}
                  >
                    {vestido.costPerDay} MXN Por día
                  </Card>
                </Col>
              );
            })}
          </Row>
        </DefaultLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
}
