import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { Col, Row, Divider, DatePicker, Checkbox, Modal, Button } from "antd";

import { getAllCars } from "../../store/actions/carsActions";
import { bookCar } from "../../store/actions/bookingActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { RangePicker } = DatePicker;

export default function CarBooking({ match }) {
  const dispatch = useDispatch();

  const { vestidos } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [vestido, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (vestidos.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(vestidos.find((o) => o._id === match.params.carid));
    }
  }, [vestidos]);

  useEffect(() => {
    setTotalAmount(totalHours * vestido.costPerDay);
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
      vestido: vestido._id,
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
      {loading === false ? (
        <DefaultLayout>
          <Row
            justify="center"
            className="d-flex align-items-center"
            style={{ minHeight: "90vh" }}
          >
            <Col lg={10} sm={24} xs={24} className="p-3">
              <img src={vestido.image} alt={vestido.name} className="vestido-img" />
            </Col>

            <Col lg={10} sm={24} xs={24} className="text-right">
              <Divider type="horizontal" dashed>
                Vestido Info
              </Divider>
              <div>
                <p>{vestido.name}</p>
                <p>{vestido.talla}</p>
                <p>Seats: {vestido.seats}</p>
                <p>{vestido.costPerDay} KR Per Hour</p>
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
                    Cost Per Hour: <b>{vestido.costPerDay}</b>
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

            {vestido.name && (
              <Modal
                visible={showModal}
                closable={false}
                footer={false}
                title="Booked time slots"
              >
                <div className="p-2">
                  {vestido.bookedTimeSlots?.map((slot, idx) => {
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
        </DefaultLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
}
