import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SizeContext from "antd/es/config-provider/SizeContext";
AOS.init();

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center mt-100">
        <h1 class="name" data-aos="zoom-in" data-aos-duration="2000">
          PrimeRooms
        </h1>
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
