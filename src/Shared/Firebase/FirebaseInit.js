import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";

const authInitApp = () => {

    initializeApp(firebaseConfig);
}

export default authInitApp;