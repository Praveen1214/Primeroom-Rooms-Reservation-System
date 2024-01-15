import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]); // Add user as a dependency to the useEffect dependency array

  return (
    <div className="ml-5 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>Profile</h1>
          <div className="row">
            <h1> Name : {user.name}</h1>
            <h1> Email : {user.email}</h1>
            <h1> Password : {user.password}</h1>
          </div>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <Mybookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profilescreen;

export function Mybookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        setLoading(false);
        setRooms(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <table className="table table-bordered table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr>
                  <td>{room.room}</td>
                  <td>{room.fromdate}</td>
                  <td>{room.todate}</td>
                  <td>{room.totalamount}</td>
                  <td>{room.totaldays}</td>
                  <td>{room.status == "booked" ? "CONFIRMED" : "CANSELED"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
