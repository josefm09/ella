const express = require("express");
const router = express.Router();

const Vestido = require("../models/vestidoModel");

router.get("/getallvestidos", async (req, res) => {
  try {
    const vestidos = await Vestido.find();
    res.send(vestidos);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addvestido", async (req, res) => {
  try {
    const newCar = new Vestido(req.body);
    await newCar.save();
    res.send("Vestido added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editvestido", async (req, res) => {
  try {
    const vestido = await Vestido.findOne({ _id: req.body._id });
    vestido.name = req.body.name;
    vestido.image = req.body.image;
    vestido.talla = req.body.talla;
    vestido.costPerDay = req.body.costPerDay;
    vestido.seats = req.body.seats;

    await vestido.save();

    res.send("Vestido details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletevestido", async (req, res) => {
  try {
    await Vestido.findOneAndDelete({ _id: req.body.carid });

    res.send("Vestido deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
