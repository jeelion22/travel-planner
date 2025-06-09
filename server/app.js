const express = require("express");

const userRouter = require("./routes/userRoutes");

const cors = require("cors");

const app = express();

const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const tripRouter = require("./routes/tripRoutes");

const flightRouter = require("./routes/flightRoutes");

const trainRouter = require("./routes/trainRoutes");

const accommodationRouter = require("./routes/accommodationRoute");

// app.use(
//   cors({
//     origin: "https://travel-planner-india.netlify.app",
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   req.header(
//     "Access-Control-Allow-Origin",
//     "https://travel-planner-india.netlify.app"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to travel-planner-india app api enpoints!" });
});

app.use("/api/users", userRouter, tripRouter);

app.use("/api/admins", flightRouter, trainRouter, accommodationRouter);

module.exports = app;

module.exports = app;
