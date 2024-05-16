import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card } from "antd";
import moment from "moment";

import { getAllBookings } from "../../store/actions/bookingActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

export default function UserBookings() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <>
      {loading === false ? (
        <DefaultLayout>
          <h3 className="text-center mt-2">Vestidos reservados</h3>

          <Row justify="center" gutter={16}>
            <Col lg={16} sm={24}>
              {bookings
                .filter((o) => o.user === user._id)
                ?.map((booking, idx) => {
                  return (
                    <Card key={idx} gutter={16}>
                      <Col lg={6} sm={24}>
                        <p>
                          <b>{booking.vestido.name}</b>
                        </p>
                        <p>
                          Costo por día: <b>{booking.vestido.costPerDay} MXN</b>
                        </p>
                        <p>
                          Días totales: <b>{booking.totalDays}</b>
                        </p>
                        <p>
                          Costo total: <b>{booking.totalAmount} MXN</b>
                        </p>
                      </Col>

                      <Col lg={12} sm={24}>
                        <p>
                          Id de la trasnacción: <b>{booking.transactionId}</b>
                        </p>
                        <p>
                          Desde: <b>{booking.bookedTimeSlots.from}</b>
                        </p>
                        <p>
                          Hasta: <b>{booking.bookedTimeSlots.to}</b>
                        </p>
                        <p>
                          Fecha de la reserva:{" "}
                          <b>
                            {moment(booking.createdAt).format("DD MMM yyyy")}
                          </b>
                        </p>
                      </Col>

                      <Col lg={6} sm={24} className="text-right">
                        <img
                          style={{ borderRadius: 5 }}
                          src={booking.vestido.image}
                          alt={booking.vestido.name}
                          height="140"
                          className="p-2"
                        />
                      </Col>
                    </Card>
                  );
                })}
            </Col>
          </Row>
        </DefaultLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
}
