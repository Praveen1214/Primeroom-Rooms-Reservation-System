const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/rooms");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: "abc123",
      status: "booked",
    });

    const booking = await newbooking.save();

    const roomtemp = await Room.findById((_id = room._id));
    console.log(roomtemp);

    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate,
      todate,
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send("Room Booked Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
