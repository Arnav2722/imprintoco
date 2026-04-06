import { useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    const ref = doc(db, "orders", id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setOrder(snap.data());
    } else {
      alert("Order not found");
    }
  };

  return (
    <div>
      <input onChange={(e) => setId(e.target.value)} />
      <button onClick={fetchOrder}>Track</button>

      {order && (
        <div>
          <p>Status: {order.status}</p>
          <p>Total: {order.total}</p>
        </div>
      )}
    </div>
  );
}
