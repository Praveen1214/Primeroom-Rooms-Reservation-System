import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bookingscreen({ match }) {
  const [rooms, setRooms] = useState();
  const [loading, setLoading] = useState(true); // Initialize as false
  const [error, setError] = useState();
  let params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = (
          await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })
        ).data;
        const data = response.data;
        setRooms(data.rooms);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Include roomid in the dependency array

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {!loading && !error && (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
            </div>
          ))}
          <div className="col-md-5">
            <h1>Booking Details</h1>
            <hr />

            {/* Displaying details for each room */}
            {rooms.map((room) => (
              <div key={room._id}>
                <p>Name: {room.name}</p>
                <p>From Date: {/* Add from date logic here */}</p>
                <p>To Date: {/* Add to date logic here */}</p>
                <p>Max Count: {room.maxcount}</p>
                {/* Add other details as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
