

import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import {
    faHouse,
    faBookOpen,
    faCartShopping,
    faUser,
    faGauge,
    faBoxOpen
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        setIsLoggedIn(false);
        setRole(null);

        alert("Logout successful");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                <Link to="/">
                    📚 NovelNest
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">

                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} />
                    Home
                </Link>

                <Link to="/novels">
                    <FontAwesomeIcon icon={faBookOpen} />
                    Novels
                </Link>
            
                 

                {/* Login / Register / Logout */}
                {!isLoggedIn ? (

                    <>
                        <Link to="/login" className="login-btn">
                            <FontAwesomeIcon icon={faUser} />
                            Login
                        </Link>

                        <Link to="/register" className="register-btn">
                            <FontAwesomeIcon icon={faUser} />
                            Register
                        </Link>
                    </>

                ) : (
                     <>
                       <Link to="/cart">
                       <FontAwesomeIcon icon={faCartShopping} /> Cart 
                    </Link> 
                    <Link to="/Myorders" className="nav-link">
                     <FontAwesomeIcon icon={faBoxOpen} />
                          My Orders
                   </Link>
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>
          
                 </>

                )}

            </div>

        </nav>
    );
}

export default Navbar;










