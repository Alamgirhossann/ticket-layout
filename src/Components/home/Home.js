import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, userContext } from "../../App";
import "./home.css";
import user from "../../images/user.png";
import { Base64 } from "js-base64";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import { signOut } from "firebase/auth";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import Paginate from "../Paginate";

const Home = () => {
  const { user } = useContext(userContext);
  const [userVal] = user;
  console.log(userVal);
  let Navigate = useNavigate();
  const PAGE_SIZE = 10;
  const [posts, setPosts] = useState({});
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [studentClass, setStudentClass] = useState("DEFAULT");
  const [userInfo, setUserInfo] = useState({});
  const [searchBar, setSearchBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [filteredItem, setFilteredItem] = useState([])
  console.log(posts, studentClass, userInfo, );

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "rolls"),
  //     orderBy("name", "desc"),
  //     limit(PAGE_SIZE)
  //   );
  //   const unsubscribe = onSnapshot(q, (documents) => {
  //     const tempPosts = [];
  //     documents.forEach((document) => {
  //       tempPosts.push({
  //         id: document.id,
  //         ...document.data(),
  //       });
  //     });
  //     setPosts(tempPosts);
  //     setLastVisible(documents.docs[documents.docs.length - 1]);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "userCollection"),
  //     where("uid", "==", userVal.uid)
  //   );
  //   const noteListener = onSnapshot(q, (querySnap) => {
  //     let list = [];
  //     querySnap.forEach((doc) => {
  //       if (doc) {
  //         // list.push({ ...doc.data(), id: doc.id });
  //         setUserInfo({ ...doc.data(), id: doc.id });
  //       }
  //     });
  //   });
  //   return noteListener;
  // }, [user]);

  // const nextPage = async () => {
  //   const postsRef = collection(db, "rolls");
  //   const q = query(
  //     postsRef,
  //     orderBy("name", "desc"),
  //     startAfter(lastVisible), // Pass the reference
  //     limit(PAGE_SIZE)
  //   );
  //   const documents = await getDocs(q);
  //   updateState(documents);
  // };

  // const previousPage = async () => {
  //   const postsRef = collection(db, "rolls");
  //   const q = query(
  //     postsRef,
  //     orderBy("name", "desc"),
  //     endAt(firstVisible), // Use `endAt()` method and pass the reference
  //     limitToLast(PAGE_SIZE)
  //   );
  //   const documents = await getDocs(q);
  //   updateState(documents);
  // };

  // const updateState = (documents) => {
  //   if (!documents.empty) {
  //     const tempPosts = [];
  //     documents.forEach((document) => {
  //       tempPosts.push({
  //         id: document.id,
  //         ...document.data(),
  //       });
  //     });
  //     setPosts(tempPosts);
  //   }
  //   if (documents?.docs[0]) {
  //     setFirstVisible(documents.docs[0]);
  //   }
  //   if (documents?.docs[documents.docs.length - 1]) {
  //     setLastVisible(documents.docs[documents.docs.length - 1]);
  //   }
  // };

  // const searchWithClass = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (studentClass !== "All") {
  //       const q = query(
  //         collection(db, "rolls"),
  //         where("class", "==", studentClass)
  //       );
  //       const noteListener = await onSnapshot(q, (querySnap) => {
  //         let list = [];
  //         querySnap.forEach((doc) => {
  //           if (doc) {
  //             list.push({ ...doc.data(), id: doc.id });
  //           }
  //         });

  //         setPosts(list);
  //         setLoading(false);
  //       });
  //       return noteListener;
  //     } else {
  //       const q = query(
  //         collection(db, "rolls"),
  //         orderBy("name", "desc"),
  //         limit(PAGE_SIZE)
  //       );
  //       const unsubscribe = onSnapshot(q, (documents) => {
  //         const tempPosts = [];
  //         documents.forEach((document) => {
  //           tempPosts.push({
  //             id: document.id,
  //             ...document.data(),
  //           });
  //         });
  //         setPosts(tempPosts);
  //         setLastVisible(documents.docs[documents.docs.length - 1]);
  //       });
  //       return () => unsubscribe();
  //     }
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  // const search = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const q = query(collection(db, "rolls"), where("name", "==", input));
  //     const noteListener = await onSnapshot(q, (querySnap) => {
  //       let list = [];
  //       querySnap.forEach((doc) => {
  //         if (doc) {
  //           list.push({ ...doc.data(), id: doc.id });
  //         }
  //       });

  //       setPosts(list);
  //       setInput("");
  //       setLoading(false);
  //     });
  //     return noteListener;
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  // const download = () => {
  //   htmlToImage
  //     .toPng(document.getElementById("table"), { quality: 1 })
  //     .then(function (dataUrl) {
  //       var link = document.createElement("a");
  //       link.download = "my-image-name.jpeg";
  //       const pdf = new jsPDF();
  //       const imgProps = pdf.getImageProperties(dataUrl);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(dataUrl, "png", 0, 0, pdfHeight, pdfWidth);
  //       pdf.save("download.pdf");
  //     });
  // };

  
  

 const dataFetching = async () => {
    try {
      const res = await fetch(
        "https://native-note-app-c6215-default-rtdb.firebaseio.com/student.json"
      );
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   dataFetching();
  // }, []);

  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // if (posts !==null || undefined) {
  //   var currentPosts = Object.keys(posts)
  //   .slice(indexOfFirstPost, indexOfLastPost)
  //   .map((key) => ({ [key]: posts[key] }));
    
  // }
  // setFilteredItem(currentPosts)
  // console.log(typeof currentPosts, currentPosts);
  // // Change page
  // const pagination = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div className="student-home-container">
      <div className="child-container">
      <Paginate/>
    </div>
    </div>
  );
};

export default Home;
