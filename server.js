const express = require("express");

const app = express();

const dbconfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/build"));

  // Serve the index.html file for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("Node Server Started using Nodemon!"));
