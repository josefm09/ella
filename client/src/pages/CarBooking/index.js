import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { Col, Row, Divider, DatePicker, Checkbox, Modal, Button } from "antd";

import { getAllCars } from "../../store/actions/carsActions";
import { bookCar } from "../../store/actions/bookingActions";

import Spinner from "../../components/Spinner";

const { RangePicker } = DatePicker;

const CarBooking = ({ match }) => {
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.costPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  };

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  };

  return (
    <>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img src={car.image} alt={car.name} className="carimg2 bs1 w-100" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div>
            <p>{car.name}</p>
            <p>{car.transmission}</p>
            <p>Seats: {car.seats}</p>
            <p>{car.costPerHour} KR Per Hour</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </Button>
          {from && to && (
            <div>
              <p>
                Total Hours: <b>{totalHours}</b>
              </p>
              <p>
                Cost Per Hour: <b>{car.costPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Cost: {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="NOK"
                amount={totalAmount * 100}
                stripeKey="pk_test_51KEFwfCLH4hE1KANoSGrO4F4bIv74aBAm9jUGMxI2lQzedktY2h8KNNwqG87cvAHEbHeLoyaPXrNbDPINotK6yxB007aOPlyXj"
              >
                <Button type="primary">Book Now</Button>
              </StripeCheckout>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, idx) => {
                return (
                  <Button key={idx} type="primary">
                    {slot.from} - {slot.to}
                  </Button>
                );
              })}

              <div className="text-right mt-5">
                <Button
                  type="primary"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </>
  );
};

export default CarBooking;
