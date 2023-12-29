import React, { useEffect, useState } from "react";
import "./registerform.css";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sucess from "../components/Sucess";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const results = await axios.post("/api/users/login", user);
      setLoading(false);

      localStorage.setItem("currentUser", JSON.stringify(results));
      window.location = "/home";
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          Login();
        }}
      >
        <div class="container">
          <h1 className="h1reg">Login</h1>
          <p className="preg">Kindly fill Enter Your Details.</p>

          <label for="email">
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

          <label for="pwd">
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

          <button className="btnreg" type="submit" onClick={Login}>
            Login
          </button>
        </div>

        <div></div>
      </form>
    </div>
  );
}

export default Loginscreen;
