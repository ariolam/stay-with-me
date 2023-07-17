const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

// GET route ==> to display the signup form to users
router.get("/destination", (req, res) => res.render("home"));

module.exports = router;
