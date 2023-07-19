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
        return;
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

// POST ==> display reservation
router.post("/reserve/:hotelId", async (req, res) => {
    console.log(req);
    const { hotelId } = req.params;
    const { nights, startDate } = req.body;
    console.log(hotelId);
    try {
        const hotel = await Hotel.findById(hotelId);
        const { _id: userId, username } = req.session.user;
        const booking = await Booking.create({
            user: userId,
            hotel: hotel.id,
            date: new Date(),
            amount: nights * hotel.pricePerNight, // calculate based on number of nights
            startDate: new Date(startDate),
            nights,
        });
        res.render("reservation", { hotel, booking });
    } catch (error) {
        console.log("error", error);
    }
});

// POST ==> delete booking
router.post("/home/:bookingId/delete", async (req, res, next) => {
    console.log(req.params);
    const { bookingId } = req.params;
    try {
        await Booking.findByIdAndDelete(bookingId);
        res.redirect("/home");
    } catch (error) {
        console.log(error);
    }
});

// Get ==> route to display the form to update a specific booking
router.get("/home/:bookingId/edit", (req, res, next) => {
    console.log(req.params);
    const { bookingId } = req.params;
    Booking.findById(bookingId)
        .then((bookingToEdit) => {
            // console.log(bookingToEdit);
            res.render("booking-edit", { booking: bookingToEdit });
        })
        .catch((error) => next(error));
});

// POST route to make updates on a specific booking
router.post("/home/:bookingId/edit", (req, res, next) => {
    const { bookingId } = req.params;
    const { nights } = req.body;

    Booking.findByIdAndUpdate(bookingId, { nights }, { new: true })
        .then((updatedBooking) => res.redirect("/userProfile")) // go to the details page to see the updates
        .catch((error) => next(error));
});

module.exports = router;
