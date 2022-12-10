import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../App";

const Admin = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('')
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    uid:"",
  });
  let Navigate = useNavigate();
  console.log(data);

  const getSingelUser = async () => {
    const docRef = doc(db, "userCollection", id);
    const snapshot = await getDoc(docRef);
    if ((await snapshot).exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    id && getSingelUser();
  }, [id]);

  const createAdmin = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "admin"), {
        ...data, admin: true
      });
      alert("your data is submited successfully");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-section pt-5 mt-5">
      <div className="container">
        <h3 className="text-center">REGISTER FORM</h3>
        <div className="form-control-section">
          <form className="row g-3">
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
                name="fName"
                value={data.firstName}
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
                name="lName"
                value={data.lastName}
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
                name="email"
                value={data.email}
              />
              
            </div>
            <div className="col-md-6">
              <label htmlFor="validationDefault03" className="form-label">
                Uid
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault03"
                placeholder="Email"
                required
                name="uid"
                value={data.uid}
              />
              
            </div>
            {
              // <div className="col-md-6">
              //   <label htmlFor="validationDefault04" className="form-label">
              //     Password
              //   </label>
              //   <input
              //     type="password"
              //     className="form-control"
              //     id="validationDefault05"
              //     placeholder="Password"
              //     required
              //     onChange={(e) => setPassword(e.target.value)}
              //   />
              // </div>
            }
            <div className="col-12 text-center">
              <button
                onClick={createAdmin}
                className="btn btn-primary"
                type="submit"
              >
                Confirm Admin
              </button>
            </div>
            <p>{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
