import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./registerform.css";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const user = {
        email,
        password,
      };
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        setLoading(false);

        const userData = response.data;

        localStorage.setItem("currentUser", JSON.stringify(userData));

        // Redirect to the home page
        navigate("/home");
      } catch (error) {
        setLoading(false);
        console.error("Login error:", error);
        setError(true);
      }
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <form onSubmit={(e) => e.preventDefault()}>
        {error && <Error message={"Invalid Credential"} />}
        <div className="container">
          <h1 className="h1reg">Login</h1>
          <p className="preg">Kindly fill Enter Your Details.</p>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          {emailError && <div>{emailError}</div>}

          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="pwd"
            id="pwd"
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          {passwordError && <div>{passwordError}</div>}

          <button className="btnreg" type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Loginscreen;
