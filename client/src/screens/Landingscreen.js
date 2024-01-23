import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SizeContext from "antd/es/config-provider/SizeContext";
AOS.init();

function Landingscreen() {
  return (
    <div
      style={{
        backgroundImage: "url(/images/landing.jpg)",
      }}
      className="row landing "
      data-aos="zoom-out"
      data-aos-duration="1100"
    >
      <div className="col-md-13 text-center mt-100">
        <h2
          data-aos="zoom-in"
          data-aos-duration="2000"
          style={{ color: "white", fontSize: "80px", fontWeight: "bold" }}
        >
          PrimeRooms
        </h2>
        <h3
          data-aos="zoom-out"
          data-aos-duration="2000"
          style={{ fontSize: "40px" }}
        >
          Book your room now
        </h3>
        <Link to="/home">
          <button className="btn btn-dark">Get Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
