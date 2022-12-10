import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../App";
import extend from "../images/home.png";
import '../App.css'

const Sidemenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { collapseSidebar } = useProSidebar();
  let Navigate = useNavigate();

  const signout = () => {
    signOut(auth);
    Navigate("/");
  };
  
  return (
    // <div style={{marginTop:"50px"}}>
    //   <Sidebar
    //     style={{
    //       height: "100vh",
    //       backgroundRepeat: "repeat-y",
    //       background: "blue",
    //       color: "white",
    //     }}
    //   >
    //     <div className="d-flex justify-content-between">
    //       <Link
    //         className="navbar-brand text-white m-0"
    //         to={user ? "/home" : "/"}
    //       >
    //         Home
    //       </Link>
    //       <div style={{ display: "flex", alignItems: "center" }}>
    //         <img
    //           onClick={() => collapseSidebar()}
    //           style={{ height: "20px", width: "20px", cursor: "pointer" }}
    //           src={extend}
    //           alt="open/close"
    //         />
    //       </div>
    //     </div>
    //     <Menu>
    //       <MenuItem style={{ padding: 0 }} routerLink={<Link to="/users" />}>
    //         {" "}
    //         Users
    //       </MenuItem>
    //       <MenuItem
    //         style={{ padding: 0 }}
    //         routerLink={<Link to="/attendance" />}
    //       >
    //         {" "}
    //         Attendance
    //       </MenuItem>
    //       <MenuItem style={{ padding: 0 }}>
    //         {user.firstName} {user.lastName}
    //       </MenuItem>
    //       <MenuItem style={{ padding: 0 }} onClick={signout}>
    //         {" "}
    //         Signout
    //       </MenuItem>
    //     </Menu>
    //   </Sidebar>
    //   {}
    // </div>
    <div className="container-fluid mt-5 p-0">
    <button className="open" onClick={()=>setIsOpen(prev => !prev)}>open</button>
      <div >
      <div className="row sidemenu" style={isOpen?{display:"block", zIndex:2}:{display:"none"}}>
        <div className="col-auto min-vh-100 bg-primary pt-4">
          <ul>
            <li>
              <a href="" className="nav-link">
               <img src={extend} className="bg-white"/> <span className="ms-1 d-none d-sm-inline text-white">Users</span>
              </a>
            </li>
            <li>
              <a href="" className="nav-link">
              <img src={extend} className="bg-white"/> <span className="ms-1 d-none d-sm-inline text-white">Attendance</span>
              </a>
            </li>
            <li>
              <a href="" className="nav-link">
              <img src={extend} className="bg-white"/> <span className="ms-1 d-none d-sm-inline text-white">{user.firstName} {user.lastName}</span>
              </a>
            </li>
            <li>
              <a href="" className="nav-link">
              <img src={extend} className="bg-white"/>  <span className="ms-1 d-none d-sm-inline text-white">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidemenu;
