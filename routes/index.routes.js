const express = require("express");
const router = express.Router();
// require booking model
const Hotel = require("../models/Hotel.model");
// require booking model
const Booking = require("../models/Booking.model");

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

// GET route ==> to display the available hotels
router.get("/home", async (req, res) => {
    console.log(req.query);
    if (req.query.destination === undefined && req.query.guests === undefined) {
        res.render("home", { hotels: [] });
    }
    // else load the search results
    // const destinationQuery = req.query.destination;
    // const guestsQuery = req.query.guests;
    // destructuring and renaming
    const { destination: destinationQuery, guests: guestsQuery } = req.query;
    console.log("destinationQuery", destinationQuery);
    try {
        const hotels = await Hotel.find({
            location: destinationQuery,
            guests: parseInt(guestsQuery),
        });
        console.log("hotels", hotels);
        res.render("home", { hotels });
    } catch (error) {
        console.log("error", error);
    }
});

// GET POST ==> display reservation
router.post("/reserve/:hotelId", async (req, res) => {
    const { hotelId } = req.params;
    console.log(hotelId);
    try {
        const hotel = await Hotel.findById(hotelId);
        const { _id: userId, username } = req.session.user;
        const booking = await Booking.create({
            user: userId,
            hotel: hotel.id,
            date: new Date(),
            amount: 500, // calculate based on number of nights
            startDate: new Date(),
            nights: 2,
        });
        res.render("reservation", { hotel, booking });
    } catch (error) {
        console.log("error", error);
    }
});

module.exports = router;
