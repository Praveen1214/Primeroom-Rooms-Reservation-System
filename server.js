const express = require("express");
const path = require("path");

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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/build"));

  // Serve the index.html file for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Server running on port ${port} with nodemon`)
);
