import authInitApp from "../Shared/Firebase/FirebaseInit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useEffect } from "react";

authInitApp();

const useFirebase = () => {
  const auth = getAuth();
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const registerUser = (email, password, name, history, location) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        savedUser(email, name);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        const destination = location?.state?.from || "/profile";
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const savedUser = (email, displayName) => {
    const user = { email, displayName };
    fetch("https://rocky-island-87400.herokuapp.com/usersCollection", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const handleCreateUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  // signin using email and password

  const loginUser = (email, password, history, location) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password, history, location)
      .then((result) => {
        setUser(result.user);
        const destination = location?.state?.from || "/profile";
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // get curent user
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // handling Log out
  const logOut = () => {
    // setIsloading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/signin");
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
    // .finally(() => setIsloading(false))
  };

  return {
    handleCreateUser,
    loginUser,
    user,
    admin,
    loading,
    setLoading,
    registerUser,
    setUser,
    logOut,
  };
};

export default useFirebase;
