import { useState, useEffect, createContext } from "react";
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
import { getStorage } from "firebase/storage";
import LoninPage from "./Components/loginRegister/LoninPage";
import HomePage from "./Components/home/HomePage";

export const firebaseConfig = {
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
export const storage = getStorage(app);

export const userContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState({})
  console.log(user, admin);
  useEffect(() => {
    const authSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // const currentUser = getUser(user)
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscribe;
  }, []);

  if (loading) {
    return(
      <p>Loading....</p>
    )
  }

  return (
    <userContext.Provider
      value={{
        user: [user, setUser],
        admin: [admin, setAdmin],
      }}
    >
      {!user ? <LoninPage /> : <HomePage user={user} />}
    </userContext.Provider>
  );
}

export default App;
