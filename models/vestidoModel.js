const mongoose = require("mongoose");

const vestidoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    talla: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],

    costPerDay: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vestidos", vestidoSchema);
