import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { getStorage} from "firebase/storage";
import user from "../src/images/user.png";
import Home from "./Components/Home";
import InfoForm from "./Components/InfoForm";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyClrwaimTFaIXs4mc6ZKJkGbwyhvumo8-M",
  authDomain: "native-note-app-c6215.firebaseapp.com",
  projectId: "native-note-app-c6215",
  storageBucket: "native-note-app-c6215.appspot.com",
  messagingSenderId: "722674141296",
  appId: "1:722674141296:web:06867341b7b45e30800cb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

function App() {
  return(
    <BrowserRouter>
    <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/infoForm" element={<InfoForm />} />
          <Route path="/update/:id" element={<InfoForm />} />
      
          
    </Routes>
  </BrowserRouter>
  )
  
  
}

export default App;
