import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCthHgRoO1EAXTzsZ-kPGHwsFp2lvO8yyY",
  authDomain: "taskme-37669.firebaseapp.com",
  projectId: "taskme-37669",
  storageBucket: "taskme-37669.appspot.com",
  messagingSenderId: "655276583111",
  appId: "1:655276583111:web:364f6161dbd483cf8276e2",
  measurementId: "G-0XW5E8L6WB",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export { app, auth, getApp, getAuth, storage, useAuth, db };
