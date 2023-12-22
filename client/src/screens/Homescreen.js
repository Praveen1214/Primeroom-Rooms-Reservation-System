import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
        {!loading && !error && (
          <div>
            {rooms.map((room) => (
              <div className="col-md-10 mt-3" key={room.id}>
                <Room room={room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
