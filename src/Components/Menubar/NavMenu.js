import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./style.css";
import { IconContext } from "react-icons";
import { auth } from "../../App";
import { signOut } from "firebase/auth";
import Subnav from "./Subnav";

const NavMenu = ({ user }) => {
  console.log(user);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  let Navigate = useNavigate();

  const signout = () => {
    signOut(auth);
    Navigate("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="nav-div">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <Link to="/" className="title-1 text-white">
              <h5 className="m-1">Attendance</h5>
            </Link>
          </div>
          <div className="userInfo">
            <div className="d-flex align-items-center">
              <p className="userTitle">
              <BiIcons.BiUserCircle className=" fs-2"/> {user.firstName} {user.lastName}
              </p>
            </div>
            <div class="dropdown mx-3">
              <button
                class="btn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsIcons.BsThreeDotsVertical />
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                   <BiIcons.BiUserCircle className="text-dark fs-5"/> Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={signout}>
                   <AiIcons.AiOutlineLogout className="text-dark fs-5"/> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="menu-bar-item">
            {SidebarData.map((item, index) => {
              return <Subnav item={item} key={index}/>
              
            })}
            </div>
          </ul>
        </nav>
        <div className="second-nav">
          <nav className="nav-menu active">
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="/" className="title text-white">
                  <h5 className="m-1">Attendance</h5>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return <Subnav item={item} key={index}/>
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default NavMenu;
