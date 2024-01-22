import React, { useEffect, useState } from "react";
import "./registerform.css";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sucess from "../components/Sucess";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [success, setsucess] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function Register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
      };

      try {
        setLoading(true);
        const result = await axios.post("/api/users/register", user);

        setLoading(false);
        setsucess(true);

        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <form>
        <div class="container">
          {success && <Sucess message="Registation Success" />}
          <h1 className="h1reg">Register</h1>
          <p className="preg">Kindly fill in this form to register.</p>
          <label for="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
            required
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />

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

          <label for="pwd-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="pwd-repeat"
            id="pwd-repeat"
            required
            value={cpassword}
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
          />

          <button className="btnreg" type="submit" onClick={Register}>
            Register
          </button>
        </div>

        <div>
          <p className="preg">
            Already have an account? <a href="./login">Log in</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registerscreen;
