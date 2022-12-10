import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import "./style.css";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import user from "../../images/user.png";
import { db, storage } from "../../App";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import imageToBase64 from "image-to-base64/browser";
import { Firebase } from "firebase/app";

function InfoForm() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [base, setBase] = useState(null);
  let navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    account: "",
    name: "",
    roll: "",
    regi: "",
    batch: "",
    mobile: "",
    class: "",
    address: "",
    gender: "",
    father: "",
    mother: "",
    adDate: "",
    birthDate: "",
    RName: "",
    realtion: "",
    pAddress: "",
    contact: "",
  });
  console.log("id===", id, "image===", data.image, base, data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      //  const base =
      imageUrlToBase64(file);
      //  setFile(file)
    }
  };

  //  const imageUrlToBase64=(url)=>{
  //   imageToBase64(url) // Image URL
  //   .then(
  //       (response) => {
  //           console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
  //           setFile(response)
  //       }
  //   )
  //   .catch(
  //       (error) => {
  //           console.log(error); // Logs an error if there was one
  //       }
  //   )
  //  }

  const imageUrlToBase64 = (url) => {
    var blob = new Blob([url], { type: "text/plain" });
    var file = new File([blob], "foo.txt", { type: "text/plain" });
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setBase(base64);
    };
  };
  const imageToBase64 = (url) => {
    var blob = new Blob([url], { type: "image/jpeg" });
    var file = new File([blob], "foo.txt", { type: "image/jpeg" });
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setFile(base64);
    };
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, "image");
      const message2 = base;

      uploadString(storageRef, message2, "data_url").then((snapshot) => {
        console.log("Uploaded a base64 string!");
        setData((prev) => ({ ...prev, image: base }));
      });

      //     getDownloadURL(storageRef)
      // .then((url) => {
      //   imageToBase64(url)
      //   setData((prev) => ({ ...prev, image: base}));
      //   // Insert url into an <img> tag to "download"
      // })
      // .catch((error) => {
      //   // A full list of error codes is available at
      //   // https://firebase.google.com/docs/storage/web/handle-errors
      //   switch (error.code) {
      //     case 'storage/object-not-found':
      //       // File doesn't exist
      //       break;
      //     case 'storage/unauthorized':
      //       // User doesn't have permission to access the object
      //       break;
      //     case 'storage/canceled':
      //       // User canceled the upload
      //       break;

      //     // ...

      //     case 'storage/unknown':
      //       // Unknown error occurred, inspect the server response
      //       break;
      //   }
      // });

      // const storageRef = ref(storage, "image");
      //     const name = new Date().getTime() + file.name;

      //     const uploadTask = uploadBytesResumable(storageRef, file);

      //     uploadTask.on(
      //       "state_changed",
      //       (snapshot) => {
      //         const progress =
      //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //         setProgress(progress);
      //         switch (snapshot.state) {
      //           case "paused":
      //             console.log("Upload is Paused");
      //             break;
      //           case "running":
      //             console.log("Upload is running");
      //             break;
      //           default:
      //             break;
      //         }
      //       },
      //       (error) => {
      //         console.log(error);
      //       },
      //       () => {
      //         getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
      //           console.log(downloadUrl, typeof(downloadUrl))
      //           imageUrlToBase64(downloadUrl)
      //           setData((prev) => ({ ...prev, image: base}));
      //         });
      //       }
      //     );
    };
    base && uploadFile();
  }, [base]);

  useEffect(() => {
    id && singelStuden();
  }, [id]);

  const getSingelStudent = async () => {
    const docRef = doc(db, "rolls", id);
    const snapshot = await getDoc(docRef);
    if ((await snapshot).exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const singelStuden=() => {
    fetch(
      `https://native-note-app-c6215-default-rtdb.firebaseio.com/student/${id}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Results", typeof data, data);
      });
  }

  const update = () => {
    fetch(
      `https://native-note-app-c6215-default-rtdb.firebaseio.com/student/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          alert('data update successfull')
          navigate('/home')
        }
      });
  };

  const updateStudent = async () => {
    try {
      await updateDoc(doc(db, "rolls", id), {
        ...data,
      });
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  let currentGender = data.gender || "DEFAULT";
  let currentClass = data.class || "DEFAULT";

  const createNote = async () => {
    try {
      await addDoc(collection(db, "rolls"), {
        ...data,
      });
      alert("your data is submited successfully");
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const postData = () => {
    fetch(
      "https://native-note-app-c6215-default-rtdb.firebaseio.com/student.json",
      {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          alert('data create successfull')
          navigate('/home')
        }
      });
  };

  const imageDiv = () => {
    if (base) {
      return (
        <img style={{ height: "150px", width: "150px" }} src={base} alt="" />
      );
    } else if (id) {
      return (
        <img
          style={{ height: "150px", width: "150px" }}
          src={data.image}
          alt=""
        />
      );
    } else {
      return (
        <img style={{ height: "150px", width: "150px" }} src={user} alt="" />
      );
    }
  };

  return (
    <div className="main-container">
      <div className="container-fluid">
        <div className="text-center mb-4">
          {id ? (
            <h1 className=" ">Update your Information</h1>
          ) : (
            <h1 className=" ">Enter your Full Information</h1>
          )}
        </div>
        <div className="row ">
          <div className="col-md-5 text-center">
            <div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Student A/c
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.account}
                    name="account"
                    id="account"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Student Name
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.name}
                    name="name"
                    id="name"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Roll Number
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.roll}
                    name="roll"
                    id="roll"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Registration No
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.regi}
                    name="regi"
                    id="regi"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Academic Year/Batch
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.batch}
                    name="batch"
                    id="batch"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Mobile No
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.mobile}
                    name="mobile"
                    id="mobile"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Class
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <select
                    style={{ width: "70%" }}
                    aria-label="Default select example"
                    value={currentClass}
                    onChange={handleChange}
                    name="class"
                  >
                    <option value="DEFAULT" disabled>
                      select class
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                    <option value="6">Six</option>
                    <option value="7">Seven</option>
                    <option value="8">Eight</option>
                    <option value="9">Nine</option>
                    <option value="10">Ten</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Address
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.address}
                    name="address"
                    id="address"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Gender
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <select
                    style={{ width: "70%" }}
                    aria-label="Default select example"
                    value={currentGender}
                    onChange={handleChange}
                    name="gender"
                  >
                    <option value="DEFAULT" disabled>
                      select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-center">
            <div className="text-center">
              {imageDiv()}

              <label
                style={{
                  background: "black",
                  width: "100%",
                  color: "#fff",
                  marginTop: "10px",
                }}
                htmlFor="img"
              >
                Browse
              </label>
              {
                // base !== null ? <p style={{width:"100%"}}>Your Photo url {base}</p> : ""
              }

              <input
                style={{ display: "none" }}
                id="img"
                onChange={handleFile}
                name="image"
                type="file"
              />
            </div>
          </div>
          <div className="col-md-5 text-center">
            <div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Father Name
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.father}
                    name="father"
                    id="father"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Mother Name
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.mother}
                    name="mother"
                    id="mother"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Admission Date
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.adDate}
                    name="adDate"
                    id="adDate"
                    onChange={handleChange}
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Date of Birth
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.birthDate}
                    name="birthDate"
                    id="birthDate"
                    onChange={handleChange}
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Ref.Name
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.RName}
                    name="RName"
                    id="RName"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Ref. Relation
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.realtion}
                    name="realtion"
                    id="realtion"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Permanent Address
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.pAddress}
                    name="pAddress"
                    id="pAddress"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 align-end">
                  <label className=" " htmlFor="">
                    Emergency Contact
                  </label>
                </div>
                <div className="col-md-7 align-start">
                  <input
                    style={{ width: "70%" }}
                    className="my-1"
                    value={data.contact}
                    name="contact"
                    id="contact"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          {id ? (
            <button className="mx-1 mt-5 add" onClick={update}>
              Update
            </button>
          ) : (
            <div>
              <button
                className="mx-1 mt-5 add"
                onClick={postData}
                disabled={progress !== null && progress < 100}
              >
                Save
              </button>
              <button className="mx-1 mt-5 delete">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoForm;
