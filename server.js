const express = require("express");

const app = express();

const dbconfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server runnging on port ${port}`));
