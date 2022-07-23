const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    transmission: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],

    costPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cars", carSchema);
