import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn"
// components
import NavBar from "./components/NavBar";
// css
import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Contact-Us" element={<Contact />} />
        <Route path="/About-Us" element={<About />} />
        <Route path="/Gas-Station-Locator" element={<HomePage />} />
        <Route
          path="/"
          element={<Navigate to="/Gas-Station-Locator" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
