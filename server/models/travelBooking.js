const mongoose = require("mongoose");

const travelBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Booking name required"],
    },

    travelType: {
      type: String,
      enum: ["flight", "train", "bus", "car rental", "other"],
      required: [true, "Travel type required"],
    },

    // members: [
    //   {
    //     userId: {
    //       type: mongoose.SchemaTypes.ObjectId,
    //       ref: "User",
    //       required: false,
    //     },
    //     name: {
    //       type: String,
    //       required: [true, "Member name required"],
    //     },
    //     relationship: {
    //       type: String,
    //       required: false,
    //     },
    //     age: {
    //       type: Number,
    //       required: false,
    //     },
    //     email: {
    //       type: String,
    //       required: false,
    //       validate: {
    //         validator: (v) => validator.isEmail(v),
    //         message: "Invalid email address",
    //       },
    //     },
    //     phone: {
    //       type: String,
    //       required: false,
    //       validate: {
    //         validator: (v) =>
    //           validator.isMobilePhone(v, "any", { strictMode: false }),
    //         message: "Invalid phone number",
    //       },
    //     },
    //   },
    // ],

    source: {
      type: String,
      required: [true, "Place of boarding required"],
    },
    destination: {
      type: String,
      required: [true, "Place of destination required"],
    },
    departureTime: {
      type: Date,
      required: [true, "Departure time required"],
      validate: {
        validator: (v) => {
          const today = new Date();

          return v >= today;
        },
        message: "Departure date must be today or later",
      },
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time required"],
      validate: {
        validator: (v) => {
          const today = new Date();

          return v >= today;
        },
        message: "Departure date must be today or later",
      },
    },
    returnDate: {
      type: Date,
      required: false,
      validate: {
        validator: (v) => v >= new Date(),
        message: "Return date must be today or later",
      },
    },
    cost: {
      currency: {
        type: String,
        required: [true, "Currency type required"],
      },
      amount: {
        type: Number,
        required: [true, "Amount required"],
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
    },
  },
  { discriminatorKey: "travelType" }
);

const TravelBooking = mongoose.model(
  "TravelBooking",
  travelBookingSchema,
  "TravelBookings"
);

module.exports = TravelBooking;
