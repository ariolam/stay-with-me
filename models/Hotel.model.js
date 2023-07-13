const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: false,
  },
  guest: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
