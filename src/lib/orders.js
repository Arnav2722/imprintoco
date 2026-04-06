import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const placeOrder = async (user, cart, total, address) => {
    const orderId = "IMP-" + Date.now();

    const orderData = {
        orderId,
        userId: user.uid,
        items: cart,
        total,
        address,
        status: "pending",
        createdAt: new Date()
    };

    await setDoc(doc(db, "orders", orderId), orderData);

    return orderId;
};