import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../App";
import Sidemenu from "./Sidemenu";

const Navbar = ({ user }) => {
  let Navigate = useNavigate();

  const signout = () => {
    signOut(auth);
    Navigate('/')
  };

  console.log(user)

  return (
    <nav className="navbar navbar-expand-lg nav-background bg-primary fixed-top">
    
      <div className="container-fluid">
      
        {
          <Link className="navbar-brand text-white" to={user ? "/home" : "/"}>
            Home
          </Link>
        }
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                  user ? 
                  (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active text-white" to="/users">
                        user
                      </Link>
                    </li>
                    
                    <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      to="/attendance"
                      aria-disabled="true"
                    >
                      Attendance
                    </Link>
                  </li>

                    <li className="nav-item">
                      {
                        <a className="nav-link text-white" aria-disabled="true">
                          {user.firstName} {user.lastName}
                        </a>
                      }
                    </li>
                    <li className="nav-item">
                      <a
                        // to='/'
                        className="nav-link text-white"
                        aria-disabled="true"
                        onClick={signout}
                        style={{ cursor: "pointer" }}
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      {
                        <a className="nav-link text-white" aria-disabled="true">
                          {user.firstName} {user.lastName}
                        </a>
                      }
                    </li>
                    <li className="nav-item">
                      <a
                        // to='/'
                        className="nav-link text-white"
                        aria-disabled="true"
                        onClick={signout}
                        style={{ cursor: "pointer" }}
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                )}
              </ul>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img style={{ height: "1.8rem" }} src="" alt="" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/signin">
                      Signin
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
