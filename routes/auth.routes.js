const { Router } = require("express");
const router = new Router();
// require bcryptjs and use it
const bcryptjs = require("bcryptjs");
// require user model
const User = require("../models/User.model");

// GET route ==> to display the signup form to users
router.get("/signup", (req, res) => res.render("auth/signup"));

// POST route ==> to process form data
router.post("/signup", async (req, res, next) => {
    console.log(req.body);

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
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("auth/signup", {
                errorMessage: error.message,
            });
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
router.get("/userProfile", (req, res) => res.render("users/user-profile"));

// GET route ==> to display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// POST login route ==> to process form data
router.post("/login", (req, res, next) => {
    // console.log(req.body);
    if (username === "" || password === "") {
        res.render("auth/login", {
            errorMessage: "Please enter both, username and password to login.",
        });
        return;
    }
});

module.exports = router;
