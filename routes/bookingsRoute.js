const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const Room = require("../models/rooms");
const stripe = require("stripe")(
  "sk_test_51OXkFEKKVI3hDMQUoT4HSVu2vKZO5F5uKdq7l6ZuojSoncMJAYMDTpV6puQccNDFgxUbQR17EytZElTJt5b3gTRk00uR82qMXJ"
);

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        totalamount,
        totaldays,
        transactionId: "abc123",
        status: "booked",
      });

      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });

      console.log(roomtemp);

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
    }

    res.send("Room Booked Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
