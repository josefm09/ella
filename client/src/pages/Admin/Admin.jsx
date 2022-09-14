import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button, Popconfirm, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { deleteCar, getAllCars } from "../../store/actions/carsActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

export default function Admin() {
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <Row justify="center" gutter={16} className="mt-2">
            <Col lg={20} sm={24}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mt-1 mr-2">Admin Panel</h3>
                <Button type="primary">
                  <a href="/addcar">Add Car</a>
                </Button>
              </div>
            </Col>
          </Row>

          <Row justify="center" gutter={16}>
            {totalCars?.map((car) => {
              return (
                <Col key={car._id} lg={5} sm={20} xs={24}>
                  <Card
                    title={car.name}
                    style={{
                      width: 300,
                    }}
                    cover={<img alt={car.name} src={car.image} />}
                    actions={[
                      <Link to={`/editcar/${car._id}`}>
                        <EditOutlined
                          key="edit"
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </Link>,
                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => {
                          dispatch(deleteCar({ carid: car._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          key="delete"
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </Popconfirm>,
                    ]}
                  >
                    {car.costPerHour} KR Per Hour
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
