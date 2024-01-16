import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center mt-100">
        <h2 style={{ color: "white", fontSize: "80px", fontWeight: "bold" }}>
          PrimeRooms
        </h2>
        <h3>Book your room now</h3>
        <Link to="/home">
          <button className="btn btn-dark">Get Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
