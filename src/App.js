
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/Login";
import SignUp from './pages/SignUp'
import Search from "./pages/Search";

// components
import NavBar from "./components/NavBar";
// css
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarOnPages = ["/Search"];
  const showNavBar = !hideNavbarOnPages.includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/Login" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp/>} />
        <Route path="/Contact-Us" element={<Contact />} />
        <Route path="/About-Us" element={<About />} />
        <Route path="/Gas-Station-Locator" element={<HomePage />} />

        <Route path="/Search" element={<Search />} />
        <Route
          path="/"
          element={<Navigate to="/Gas-Station-Locator" replace />}
        />
      </Routes>
    </>
  );
};

export default App;
