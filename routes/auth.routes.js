const { Router } = require("express");
const router = new Router();
//require mongoose
const mongoose = require("mongoose");
// require bcryptjs and use it
const bcryptjs = require("bcryptjs");
// require user model
const User = require("../models/User.model");
// require booking model
const Booking = require("../models/Booking.model");
// require booking model
const Hotel = require("../models/Hotel.model");
// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// GET route ==> to display the signup form to users
router.get("/signup", isLoggedOut, (req, res) => res.render("auth/signup"));

// POST route ==> to process form data
router.post("/signup", async (req, res, next) => {
    console.log(req.body);
    //  console.log(req.body);
    const { username, password } = req.body;

    // make sure passwords are strong, regular expressions
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render("auth/signup", {
            errorMessage:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }

    // make sure users fill all mandatory fields:
    if (!username || !password) {
        res.render("auth/signup", {
            errorMessage:
                "All fields are mandatory. Please provide your username and password.",
        });
        return;
    }
    //copy of body
    const user = { ...req.body };
    //delete property password
    delete user.password;
    // add the ecrypted password in DB
    const salt = bcryptjs.genSaltSync(13);
    user.passwordHash = bcryptjs.hashSync(req.body.password, salt);
    try {
        const newUser = await User.create(user);
        //sending the copy with the encrypted password
        console.log(newUser);
        res.redirect("/userProfile");
    } catch (error) {
        console.log("error", error);
        // make sure users fill in data in the valid format
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("auth/signup", {
                errorMessage: error.message,
            });
            // make sure data in the database is clean - no duplicates
        } else if (error.code === 11000) {
            res.status(500).render("auth/signup", {
                errorMessage:
                    "Username needs to be unique.Username is already used.",
            });
        } else {
            next(error);
        }
    }
});

//GET route ==> render profile page
router.get("/userProfile", isLoggedIn, async (req, res) => {
    // console.log("req.session.user", req.session.user);
    const { _id: userId, username } = req.session.user;
    // console.log("userId", userId);
    // console.log("username", username);

    try {
        const bookings = await Booking.find({ user: userId }).populate("hotel");
        console.log(bookings);
        res.render("users/user-profile", { username, bookings });
    } catch (error) {
        console.log("error occured: ", error);
    }
});

// GET route ==> to display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// POST login route ==> to process form data
router.post("/login", async (req, res, next) => {
    // console.log("SESSION =====> ", req.session);
    // console.log(req.body);
    const { username, password } = req.body;

    //TODO username not defined
    // if (username === "" || password === "") {
    //     res.render("auth/login", {
    //         errorMessage: "Please enter both, username and password to login.",
    //     });
    //     return;
    // }
    try {
        const userData = req.body;
        const checkedUser = await User.findOne({
            username: userData.username,
        });
        // Check is user does exists in DB
        if (checkedUser) {
            // if so, compare the password with the passwordHash in DB
            if (
                bcryptjs.compareSync(
                    userData.password,
                    checkedUser.passwordHash
                )
            ) {
                // If password is correct
                const loggedUser = { ...checkedUser._doc };
                delete loggedUser.passwordHash;
                req.session.user = loggedUser;
                res.redirect("/userProfile");
            } else {
                // If password is incorrect
                console.log("Password is incorrect");
                res.render("auth/login", {
                    errorMessage: "Password is incorrect",
                    payload: { username: userData.username },
                });
            }
        } else {
            // No user with this email
            console.log("No user with this email");
            res.render("auth/login", {
                errorMessage: "No user with this email",
                payload: { username: userData.username },
            });
        }
    } catch (error) {
        console.log("error occured: ", error);
        res.render("auth/login", {
            errorMessage: "There was an error on the server",
            payload: { username: userData.username },
        });
    }
});

// POST => display logout form
router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) next(err);
        res.redirect("/");
    });
});

module.exports = router;
