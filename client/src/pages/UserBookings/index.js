import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import moment from "moment";

import { getAllBookings } from "../../store/actions/bookingActions";

import Spinner from "../../components/Spinner";

const UserBookings = () => {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user === user._id)
            .map((booking, idx) => {
              return (
                <Row key={idx} gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Cost Per Pour: <b>{booking.car.costPerHour} KR</b>
                    </p>
                    <p>
                      Total Hours: <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Total Cost: <b>{booking.totalAmount} KR</b>
                    </p>
                  </Col>

                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id: <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>

                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image}
                      alt={booking.car.name}
                      height="140"
                      className="p-2"
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </>
  );
};

export default UserBookings;
