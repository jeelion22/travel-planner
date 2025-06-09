const mongoose = require("mongoose");
const validator = require("validator");

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  type: {
    type: String,
  },

  location: {
    city: String,
    state: String,
    country: String,
  },
  address: String,

  amenities: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  // contactInfo: {
  //   phone: {
  //     type: String,
  //     validate: {
  //       validator: (v) =>
  //         validator.isMobilePhone(v, "any", { strictMode: false }),
  //       message: "Invalid phone number",
  //     },
  //   },
  //   email: {
  //     type: String,
  //     validate: {
  //       validator: (v) => validator.isEmail(v),
  //       message: "Invalid email address",
  //     },
  //   },
  // },

  cost: {
    currency: {
      type: String,
      required: [true, "Currency is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },
  },
  // tripId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Trip",
  //   required: [true, "Trip id required"],
  // },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: [true, "User id required"],
  // },
});

module.exports = mongoose.model(
  "Accommodation",
  accommodationSchema,
  "accommodations"
);
