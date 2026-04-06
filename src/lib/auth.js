import { auth } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};