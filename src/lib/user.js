// import { db } from "./firebase";
// import { doc, setDoc } from "firebase/firestore";

// export const saveUser = async (user) => {
//     await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         name: user.displayName || "",
//         email: user.email,
//         createdAt: new Date()
//     });
// };

import { db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

/**
 * user: Firebase Auth object
 * extraData: Form se aaya extra data (displayName, phoneNumber)
 */
export const saveUser = async (user, extraData = {}) => {
    const userRef = doc(db, "users", user.uid);

    try {
        const userSnap = await getDoc(userRef);

        const dataToSave = {
            uid: user.uid,
            email: user.email,
            // Form wala name ya Google wala name
            name: extraData.displayName || user.displayName || "",
            // Form wala phone number yahan save hoga
            mobile: extraData.phoneNumber || user.phoneNumber || "",
            lastLogin: serverTimestamp(),
        };

        if (!userSnap.exists()) {
            // Naya user registration
            await setDoc(userRef, {
                ...dataToSave,
                createdAt: serverTimestamp(),
            });
        } else {
            // Purana user update
            await setDoc(userRef, dataToSave, { merge: true });
        }
    } catch (error) {
        console.error("User data save karne mein error:", error);
    }
};