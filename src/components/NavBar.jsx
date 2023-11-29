import React from 'react'
import { Link } from 'react-router-dom'
import './css/NavBar.css'

const NavBar = () => {
    return (
        <nav className="nav-container">
            <Link to="/Gas-Station-Locator">Gas Station Locator</Link>
            <Link to="/About-Us">About Us</Link>
            <Link to="/Contact-Us">Contact Us</Link>
        </nav>
    )
}

export default NavBar