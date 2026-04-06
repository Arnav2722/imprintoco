import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        createdAt: new Date()
    });
};