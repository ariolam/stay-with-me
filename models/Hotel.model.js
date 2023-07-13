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
  image: {
    type: String,
    default:
      "https://www.tripadvisor.com/HotelsList-Sri_Lanka-Luxury-Beach-Resorts-zfp7946468.html",
    required: true,
  },
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
