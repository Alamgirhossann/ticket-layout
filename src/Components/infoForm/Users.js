import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../App";

const Users = () => {
  const [users, setUsers] = useState({});
  const [input, setInput] = useState('')

  const fetchUserData = async()=>{
    try {
      const res = await fetch(
        "https://native-note-app-c6215-default-rtdb.firebaseio.com/userCollection.json"
      )
      const data = await res.json()
      setUsers(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, []);

  const search = async (e) => {
    try {
      e.preventDefault();
      const q = query(collection(db, "userCollection"), where("email", "==", input));
      const noteListener = await onSnapshot(q, (querySnap) => {
        let list = [];
        querySnap.forEach((doc) => {
          if (doc) {
            list.push({ ...doc.data(), id: doc.id });
          }
        });

        setUsers(list);
      });
      return noteListener;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{marginTop:"80px"}}>
    {
    // <div className="input-box">
    //         <input
    //           style={{ width: "50%" }}
    //           type="text"
    //           value={input}
    //           placeholder="Search name"
    //           onChange={(e) => setInput(e.target.value)}
    //         />
    //         <button className="add" style={{marginLeft:"5px"}} onClick={search}>
    //           Search
    //         </button>
    //       </div>
  }
      <table class="table table-bordered" id="table">
        <thead>
          <tr>
            <th scope="col">Users Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map((user, index) => {
            console.log(user);
            const { firstName, lastName, email, id } = users[user];

            return (
              <tr>
                <td>
                  {firstName} {lastName}
                </td>
                <td>
                  {email}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
