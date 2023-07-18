const express = require("express");
const router = express.Router();
// require booking model
const Hotel = require("../models/Hotel.model");

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

// // GET route ==> to display the signup form to users
// router.get("/destination", (req, res) => res.render("home"));

// GET route ==> to display the available hotels
router.get("/home", async (req, res) => {
    console.log(req.query);
    if (req.query.destination === undefined) {
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

module.exports = router;
