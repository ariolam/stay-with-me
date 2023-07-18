const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
