//import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Bookingscreen from "./screens/Bookingscreen";
import Homescreen from "./screens/Homescreen";

import { BrowserRouter, Route, Routes /*Link*/ } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book" element={<Bookingscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
