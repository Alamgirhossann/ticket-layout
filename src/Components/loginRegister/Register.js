import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../App";
import './style.css'

const Register = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let Navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      fetch(
        "https://native-note-app-c6215-default-rtdb.firebaseio.com/userCollection.json",
        {
          method: "POST",
          body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            email: email,
            uid: result.user.uid,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            Navigate("/home");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin-signup-section">
      <div className="container">
        
        <div className="form-control-section">
          <form className="row g-3">
          <h3 className="text-center">REGISTER FORM</h3>
            <div className="col-md-6">
              <label htmlFor="validationDefault01" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault01"
                placeholder="First name"
                required
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationDefault02" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault02"
                placeholder="Last name"
                required
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationDefault03" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault03"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationDefault04" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="validationDefault05"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-12 text-center">
              <button
                onClick={submit}
                className="btn btn-primary"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="social-media-sign">
          <div className="row">
            <p className="text-center">
              Do you have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
