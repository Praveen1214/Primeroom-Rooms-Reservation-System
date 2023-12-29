import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Bookingscreen from "./screens/Bookingscreen";
import Homescreen from "./screens/Homescreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
