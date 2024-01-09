import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

const BookingScreen = ({ match }) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  let params = useParams();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = moment(todate).diff(moment(fromdate), "days") + 1;
  const [totalamount, settotalamount] = useState();

  const fetchData = async () => {
    try {
      setloading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", { roomid: roomid })
      ).data;
      settotalamount(data.rentperday * totaldays);
      setroom(data);
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      roomid,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount,
      totaldays,
      transactionId: "abc123",
      status: "booked",
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      alert("Room Booked Successfully");
      window.location.href = "/bookings";
    } catch (error) {
      console.log(error);
      setloading(false);
      alert("Something went wrong");
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="Room" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Name : </p>
                  <p>From Date : {params.fromdate}</p>
                  <p>To Date :{params.todate} </p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />

                <b>
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
