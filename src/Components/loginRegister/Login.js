import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../App";
import './style.css'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  console.log(email, password);
  let Navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    setErrorMessage('')
    signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential) {
          Navigate("/home");
        }
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("You have entered wrong password")
        }else{
          setErrorMessage("You have entered wrong email address")
        }
        // console.log(error.message)
      });
  };
  return (
    <div className="signin-signup-section">
      <div className="container">
        
        <div className="form-control-section">
          <form className="row g-3 text-center">
          <h3 className="text-center">LOGIN FORM</h3>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <h5 className="text-danger text-center">{errorMessage}</h5>
            <div className="forget">
              <Link to="" className="text-white">Reset Password</Link>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="spinner-border text-dark " role="status">
                  <span className="visually-hidden ">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="col-md-12">
                <button
                  onClick={signIn}
                  className="btn btn-primary"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            )}
            <div className="social-media-sign">
          <div className="row">
            <p className="text-center">
              Do you have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
