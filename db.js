const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Use the provided connection string or fallback to a default one
const mongoURL =
  process.env.MONGODB_URI ||
  "mongodb+srv://dileepapraveen32:eeDP1214.@praveen.jndze1l.mongodb.net/primerooms";

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("Mongo DB connection failed:", err);
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful!");
});

module.exports = mongoose;
