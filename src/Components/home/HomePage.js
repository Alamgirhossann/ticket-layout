import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth, db, userContext } from "../../App";
import Admin from "../Admin";
import AttendanceForm from "../attendance/AttendanceForm";
import Attendence from "../attendance/Attendence";
import InfoForm from "../infoForm/InfoForm";
import Users from "../infoForm/Users";
import Navbar from "../Navbar";
import Sidemenu from "../Sidemenu";
import Home from "./Home";
import { signOut } from "firebase/auth";
import NavMenu from "../Menubar/NavMenu";
import UserProfile from "../UserProfile";

const HomePage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [checkAdmin, setCheckAdmin] = useState({});
  const [userInformation, setUserInformation] = useState({});
  console.log(user.uid, checkAdmin[0], userInformation);
  // let Navigate = useNavigate();
  // useEffect(()=>{
  //   signOut(auth);
  // },[])

  useEffect(() => {
    fetch(
      `https://native-note-app-c6215-default-rtdb.firebaseio.com/userCollection.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = Object.keys(data).filter(
          (i) => data[i].uid === user.uid
        );
        setCheckAdmin(result);
        // console.log("Results", result, data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://native-note-app-c6215-default-rtdb.firebaseio.com/userCollection/${checkAdmin[0]}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserInformation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checkAdmin]);

  // useEffect(() => {
  //   if (Object.keys(checkAdmin).length === 0) {
  //     const q = query(
  //       collection(db, "userCollection"),
  //       where("uid", "==", user.uid)
  //     );
  //     const noteListener = onSnapshot(q, (querySnap) => {
  //       let list = [];
  //       querySnap.forEach((doc) => {
  //         if (doc) {
  //           // list.push({ ...doc.data(), id: doc.id });
  //           setCheckAdmin({ ...doc.data(), id: doc.id });
  //         }
  //       });
  //     });
  //     return noteListener;
  //   }

  // }, []);

  if (userInformation === null || undefined || loading) {
    return <p>Loading....</p>;
  }
  return (
    <BrowserRouter>
      <div className="fixed-top"><NavMenu user={userInformation}/></div>
      {
        // <Navbar user={userInformation}/>
      }
        <div className="m-0 p-0">
          {
          //   <div className="sidebar">
          // <Sidemenu user={userInformation} />
          // </div>
          }
          
          <div className="main-body">
          <div className="w-100">
          
              <Routes>
                {userInformation ? (
                  <React.Fragment>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/infoForm" element={<InfoForm />} />
                    <Route path="/update/:id" element={<InfoForm />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/admin/:id" element={<Admin />} />
                    <Route path="/attendance" element={<Attendence />} />
                    <Route path="/profile" element={<UserProfile userInfo={userInformation}/>} />
                    <Route
                      path="/attendanceForm"
                      element={<AttendanceForm />}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/infoForm" element={<InfoForm />} />
                    <Route path="/update/:id" element={<InfoForm />} />
                  </React.Fragment>
                )}
              </Routes>
            </div>
          </div>
            
          
            
          </div>
    </BrowserRouter>
  );
};

export default HomePage;
