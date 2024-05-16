const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vestido: { type: mongoose.Schema.Types.ObjectID, ref: "vestidos" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalDays: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    clienteRequired: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookings", bookingSchema);
