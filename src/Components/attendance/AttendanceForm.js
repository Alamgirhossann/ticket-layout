import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceForm = () => {
  let Navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState({
    accountNo: "",
    userName: "",
    machineNumber: "",
    dateTime: new Date().toLocaleString(),
  });

  console.log(attendanceData);

  const handleChange = (e) => {
    setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });
  };

  const postData = () => {
    fetch(
      "https://native-note-app-c6215-default-rtdb.firebaseio.com/attendence.json",
      {
        method: "POST",
        body: JSON.stringify({ ...attendanceData }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          alert("data create successfull");
          Navigate("/attendance");
        }
      });
  };

  return (
    <div className="main-container" >
      <div className="container-fluid">
        <div className="text-center mb-4">
          <h1 className="">Attendance Information</h1>
        </div>

        <div className="row text-center">
          <div className="col-md-12 align-start">
            <label className="" htmlFor="">
              Account No
            </label>
          </div>
          <div className="col-md-12 align-center">
            <input
              style={{ width: "100%" }}
              className="my-1"
              value={attendanceData.accountNo}
              name="accountNo"
              id="accountNo"
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-start">
            <label className="" htmlFor="">
              Machine No
            </label>
          </div>
          <div className="col-md-12 align-center">
            <input
              style={{ width: "100%" }}
              className="my-1"
              value={attendanceData.MachineNumber}
              name="machineNumber"
              id="machineNumber"
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-start">
            <label className="" htmlFor="">
              User Name
            </label>
          </div>
          <div className="col-md-12 align-center">
            <input
              style={{ width: "100%" }}
              className="my-1"
              value={attendanceData.userName}
              name="userName"
              id="userName"
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div>
          <button className="mx-1 mt-5 add" onClick={postData}>
            Save
          </button>
          <button className="mx-1 mt-5 delete">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
