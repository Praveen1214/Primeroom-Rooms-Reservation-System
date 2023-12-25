import React, { useEffect, useState } from "react";
import "./registerform.css";

function Loginscreen() {
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  function Register() {
    const user = {
      email,
      password,
    };
    console.log(user);

    alert("password not match");
  }

  return (
    <div>
      <form>
        <div class="container">
          <h1 id="h1">Login</h1>
          <p>Kindly fill Enter Your Details.</p>

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

          <button type="submit" onClick={Register}>
            Login
          </button>
        </div>

        <div></div>
      </form>
    </div>
  );
}

export default Loginscreen;
