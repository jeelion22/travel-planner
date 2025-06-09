const mongoose = require("mongoose");
const path = require("path");
const express = require("express"); // ✅ required if not in app.js
const adminController = require("./controllers/adminController");

const config = require("./utils/config");
const app = require("./app"); // this should be your Express app instance

// ✅ Correct way to serve Vite build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

console.log("Connecting to MongoDB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB...");

    adminController
      .createAdmin()
      .then(() => {
        console.log("Admin user setup completed");
        const PORT = config.MONGODB_PORT || 5000;

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.log("Failed to create admin user", error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
