import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

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
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
      return;
    }

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

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      roomid: room._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate: params.fromdate,
      todate: params.todate,
      totalamount: totaldays * room.rentperday,
      totaldays,
      token,
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire(
        "Congratulations!",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setloading(false);
      Swal.fire("Oops!", "Something Went wrong", "error");
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
          <div className="row justify-content-center mt-3 bs">
            <div className="col-md-7">
              <h1 class="h1">{room.name}</h1>
              <img src={room.imageurls[0]} className="smallimg1" alt="Room" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "left" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Name :{room.name} </p>
                  <p>From Date : {params.fromdate}</p>
                  <p>To Date :{params.todate} </p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "left" }}>
                <h1>Amount</h1>
                <hr />

                <b>
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  stripeKey="pk_test_51OXkFEKKVI3hDMQU3VFizd8BbkI7U3NrvAYv52CX5O7sj0S8FeMcaupll4Nyf67wWCzZfg8GvGovEkiSPLhxJQp500IDRjdPFB"
                >
                  <button class="btn1">Pay Now</button>
                </StripeCheckout>
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
