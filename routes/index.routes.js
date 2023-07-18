const express = require("express");
const router = express.Router();
// require booking model
const Hotel = require("../models/Hotel.model");

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
        //TODO check no availability
        // if (req.query.destination === null && req.query.guests === null) {
        //     res.render("home", {
        //         errorMessage: "There are no available hotels.",
        //     });
        // } else {
        //     next("error", error);
        // }
    }
});

module.exports = router;
