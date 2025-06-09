const mongoose = require("mongoose");

const accommodationBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User's name required"],
    },
    accommodationName: {
      type: String,
      required: [true, "Accommodation  name required"],
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    address: {
      type: String,
      required: [true, "Address required"],
    },
    amenities: [String],
    rating: Number,
    cost: {
      currency: { type: String, enum: ["INR"], required: true },
      amount: Number,
    },

    checkInDate: {
      type: Date,
      validate: {
        validator: (v) => {
          const today = new Date();

          today.setTime(0, 0, 0, 0);

          return v >= today;
        },
        message: "Check-in date must be today or later",
      },
    },

    checkOutDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v >= this.checkInDate;
        },
        message: "Check-out date must be check-in date or after",
      },
    },

    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeStamps: true }
);

const AccommodationBooking = mongoose.model(
  "AccommodationBooking",
  accommodationBookingSchema
);

module.exports = AccommodationBooking;
