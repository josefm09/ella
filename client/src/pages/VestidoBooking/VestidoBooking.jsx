import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { Col, Row, Divider, DatePicker, Checkbox, Modal, Button } from "antd";

import { getAllVestidos } from "../../store/actions/vestidosActions";
import { bookVestido } from "../../store/actions/bookingActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { RangePicker } = DatePicker;

export default function VestidoBooking({ match }) {
  const dispatch = useDispatch();

  const { vestidos } = useSelector((state) => state.vestidosReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [vestido, setVestido] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [cliente, setCliente] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (vestidos.length === 0) {
      dispatch(getAllVestidos());
    } else {
      setVestido(vestidos.find((o) => o._id === match.params.carid));
    }
  }, [vestidos]);

  useEffect(() => {
    setTotalAmount(totalDays * vestido.costPerDay);
    if (cliente) {
      setTotalAmount(totalAmount + 30 * totalDays);  // no entiedo porque se suma 30
    }
  }, [cliente, totalDays]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0]).format("DD MMM yyyy HH:mm"));
    setTo(moment(values[1]).format("DD MMM yyyy HH:mm"));

    setTotalDays(values[1].diff(values[0], "horas"));
  };

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      vestido: vestido._id,
      totalDays,
      totalAmount,
      clienteRequired: cliente,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookVestido(reqObj));
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
                {/* <p>Seats: {vestido.seats}</p> */}
                <p>{vestido.costPerDay} MXN por día</p>
              </div>

              <Divider type="horizontal" dashed>
                Selecciona el tiempo
              </Divider>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="DD MMM yyyy HH:mm"
                onChange={selectTimeSlots}
              />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Ver tiempo reservado
              </Button>
              {from && to && (
                <div>
                  <p>
                    Días totales: <b>{totalDays}</b>
                  </p>
                  <p>
                    Costo por día: <b>{vestido.costPerDay}</b>
                  </p>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCliente(true);
                      } else {
                        setCliente(false);
                      }
                    }}
                  >
                    Cliente requerido
                  </Checkbox>

                  <h3>Costo total: {totalAmount}</h3>

                  {/* <StripeCheckout
                    token={onToken}
                    currency="NOK"
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51KEFwfCLH4hE1KANoSGrO4F4bIv74aBAm9jUGMxI2lQzedktY2h8KNNwqG87cvAHEbHeLoyaPXrNbDPINotK6yxB007aOPlyXj"
                  >
                    <Button type="primary">Book Now</Button>
                  </StripeCheckout> */}
                </div>
              )}
            </Col>

            {vestido.name && (
              <Modal
                visible={showModal}
                closable={false}
                footer={false}
                title="Tiempo reservado"
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
                      CERRAR
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
