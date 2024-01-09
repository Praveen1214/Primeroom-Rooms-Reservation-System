import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import moment from "moment";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { RangePicker } = DatePicker;

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data.rooms);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
      settodate(moment(dates[1]).format("DD-MM-YYYY"));
    } else {
      // Handle the case when the user clears the date range
      setfromdate(null);
      settodate(null);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading && (
          <p>
            <Loader />
          </p>
        )}
        {!loading && !error && (
          <div>
            {rooms.map((room) => (
              <div className="col-md-10 mt-3" key={room.id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))}
          </div>
        )}
        {error && (
          <p>
            <Error />
          </p>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
