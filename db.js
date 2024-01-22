const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", true);

var mongoURL = process.env.MONGODB_URL;

mongoose.connect(process.env.MONGODB_URI || mongoURL);
var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connetion Fail");
});

connection.on("connected", () => {
  console.log("Mongo DB connetion suc!");
});

module.exports = mongoose;
