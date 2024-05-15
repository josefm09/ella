const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const { v4: uuidv4 } = require("uuid");

const Booking = require("../models/bookingModel");
const Vestido = require("../models/vestidoModel");

router.post("/reservar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "nok",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();
      const vestido = await Vestido.findOne({ _id: req.body.vestido });
      console.log(req.body.vestido);
      vestido.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await vestido.save();
      res.send("Your booking is successful!");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vestido");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
