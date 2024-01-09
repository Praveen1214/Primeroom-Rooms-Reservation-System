import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { duration } from "moment";

const BookingScreen = ({ match }) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  let params = useParams();

  let fromdate = moment(params.fromdate, "DD-MM-YYYY");
  let todate = moment(params.todate, "DD-MM-YYYY");

  const { roomid } = useParams();

  const fetchData = async () => {
    try {
      setloading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", { roomid: roomid })
      ).data;
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
                  <p>Total days : </p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Pay Now</button>
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
