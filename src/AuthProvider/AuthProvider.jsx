import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { app } from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();


  //create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //update signUp user
  const updateUser = (username, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: image,
    });
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // signIn / signUp with google
  const handleGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // signIn / signUp with Facebook
  const handleFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

 // Updated useEffect in auth
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      const userInfo = { email: currentUser.email };
      axiosPublic.post("/jwt", userInfo).then((res) => {
        if (res.data.token) {
          localStorage.setItem("access-token", res.data.token);
        }
      });
    } else {
      localStorage.removeItem("access-token");
    }
    setLoading(false);
  });

  return () => {
    unsubscribe(); 
  };
}, [axiosPublic]);


  
  const authData = {
    createUser,
    user,
    setUser,
    loading,
    signInUser,
    updateUser,
    logOut,
    handleGoogle,
    handleFacebook,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
