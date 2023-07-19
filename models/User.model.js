const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
});

const User = model("User", userSchema);

module.exports = User;
