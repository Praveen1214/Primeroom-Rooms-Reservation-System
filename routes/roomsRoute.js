const express = require("express");
const router = express.Router();

const Room = require("../models/rooms");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  const newroom = new Room(req.body);

  try {
    await newroom.save();
    res.send("Room added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
