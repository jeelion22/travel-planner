const mongoose = require("mongoose");
const config = require("./utils/config");
const path = require("path");
const app = require("./app");
const express = require("express");

console.log("Conecting to MongoDB...");

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    const PORT = config.MONGODB_PORT || 5500;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err.message);
  });
