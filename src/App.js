import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import axios from "axios";
import Create from "./Components/Create";

function App() {
  axios.defaults.withCredentials=true
  return (
    <div >

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/create" element={<Create/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
