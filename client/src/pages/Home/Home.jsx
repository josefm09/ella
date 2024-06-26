import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, DatePicker, Button, Card } from "antd";
import moment from "moment";

import { getAllVestidos } from "../../store/actions/vestidosActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { RangePicker } = DatePicker;

export default function Home() {
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

  const setFilter = (values) => {
    var selectedFrom = moment(values[0], "DD MMM yyyy HH:mm");
    var selectedTo = moment(values[1], "DD MMM yyyy HH:mm");

    var temp = [];

    for (var vestido of vestidos) {
      if (vestido.bookedTimeSlots.length === 0) {
        temp.push(vestido);
      } else {
        for (var booking of vestido.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(vestido);
          }
        }
      }
    }

    setTotalVestidos(temp);
  };

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <Row className="mb-3" justify="center">
            <Col lg={20} sm={24} className="d-flex justify-content-left">
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="DD MMM yyyy HH:mm"
                onChange={setFilter}
              />
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
                  >
                    <div className="card-footer-container">
                      {vestido.costPerDay} MXN Por día
                      <Button type="primary">
                        <Link to={`/booking/${vestido._id}`}>Rentar ahora</Link>
                      </Button>
                    </div>
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
