const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const tripRouter = require("./routes/tripRoutes");
const flightRouter = require("./routes/flightRoutes");
const trainRouter = require("./routes/trainRoutes");
const accommodationRouter = require("./routes/accommodationRoute");

const app = express();

// ✅ Enable CORS only for development or if needed
// Remove this entirely if you're using same-origin deployment (frontend served by Express)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Vite dev server
      credentials: true,
    })
  );
}

// ✅ Core middlewares
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route handling
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter); // Assuming this is a separate router
app.use("/api/flights", flightRouter);
app.use("/api/trains", trainRouter);
app.use("/api/accommodations", accommodationRouter);

// ✅ Optional: Test route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to travel-planner-india API!" });
});

module.exports = app;
