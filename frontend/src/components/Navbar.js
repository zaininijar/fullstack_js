import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate, NavLink } from "react-router-dom";
const Navbar = ({isActive}) => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
        <nav className="w-full">
          <div className="flex justify-center w-full px-16 py-8">
            <div>
              <ul className="flex md:space-y-0 md:space-x-6 text-xl md:text-2xl">
                <li>
                  <NavLink
                    to="/home"
                    className={"hover:underline" + ((isActive === "home") ? " underline" : "")}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={"hover:underline" + ((isActive === "profile") ? " underline" : "")}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button onClick={Logout} className="button is-light hover:underline">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  );
};

Navbar.propTypes = {};
export default Navbar;
