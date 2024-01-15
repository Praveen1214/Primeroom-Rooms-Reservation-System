import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { set } from "mongoose";
// Replace "../path/to/booking" with the actual path to the booking module

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { RangePicker } = DatePicker;

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setRooms(data.rooms);
        setduplicaterooms(data.rooms);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  function filterByDate(dates) {
    const dateFrom = new Date(dates[0]);
    const dateTo = new Date(dates[1]);
    setfromdate(moment(dateFrom).format("DD-MM-YYYY"));
    settodate(moment(dateTo).format("DD-MM-YYYY"));

    var tempRooms = [];

    for (const room of duplicaterooms) {
      var availability = true;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true && room.currentbookings.length > 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setRooms(temprooms);
  }

  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const tempRooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setRooms(tempRooms);
    } else setRooms(duplicaterooms);
  }
  function clearRange() {
    window.location.assign("/home");
  }

  return (
    <div className="container">
      <div className="row mt-5 d-flex align-items-center bs">
        <div className="col-md-3">
          <RangePicker
            format="DD-MM-YYYY"
            onChange={filterByDate}
            onCalendarChange={(dates) => (!dates ? clearRange() : null)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all" className="formho">
              All
            </option>
            <option value="delux" className="formho">
              {" "}
              Delux
            </option>
            <option value="non-delux" className="formho">
              Non-Delux
            </option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div
                className="col-md-9 mt-2"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
