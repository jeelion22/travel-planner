const express = require("express");

const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(express.static(path.__dirname, "../client/dist"));

app.use(
  cors({
    origin: ["https://reuniteme.netlify.app"],
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the ReUniteME's API end points!" });
});

app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);

module.exports = app;
