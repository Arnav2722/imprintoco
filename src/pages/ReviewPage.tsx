// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
//   getDocs,
//   Timestamp,
// } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import {
//   Star,
//   Upload,
//   Loader2,
//   CheckCircle,
//   ShieldCheck,
//   PenTool,
//   Image as ImageIcon,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface Review {
//   id: string;
//   username: string;
//   comment: string;
//   rating: number;
//   imageUrl: string;
//   createdAt: Timestamp;
//   orderId: string;
//   purchaseVerified: boolean;
// }

// interface VerificationData {
//   orderId: string;
//   customerName: string;
// }

// interface ReviewFormData {
//   comment: string;
//   rating: number;
// }

// const ReviewPage = (): JSX.Element => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [activeMode, setActiveMode] = useState<"view" | "write">("view");
//   const navigate = useNavigate();

//   const [verificationData, setVerificationData] = useState<VerificationData>({
//     orderId: "",
//     customerName: "",
//   });
//   const [verifyingOrder, setVerifyingOrder] = useState<boolean>(false);
//   const [orderVerified, setOrderVerified] = useState<boolean>(false);

//   const [formData, setFormData] = useState<ReviewFormData>({
//     comment: "",
//     rating: 5,
//   });
//   const [submitting, setSubmitting] = useState<boolean>(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const reviewData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...(doc.data() as Omit<Review, "id">),
//       }));
//       setReviews(reviewData);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleVerifyOrder = async (
//     e: FormEvent<HTMLFormElement>,
//   ): Promise<void> => {
//     e.preventDefault();
//     setVerifyingOrder(true);
//     const q = query(
//       collection(db, "orders"),
//       where("orderId", "==", verificationData.orderId),
//       where("customerName", "==", verificationData.customerName),
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         setOrderVerified(true);
//       } else {
//         alert("Verification failed. Check your ID and Name.");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setVerifyingOrder(false);
//     }
//   };

//   const handlePublishReview = async (
//     e: FormEvent<HTMLFormElement>,
//   ): Promise<void> => {
//     e.preventDefault();
//     if (!imageFile) return;
//     setSubmitting(true);
//     try {
//       const data = new FormData();
//       data.append("file", imageFile);
//       data.append("upload_preset", "poster_reviews");
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload",
//         { method: "POST", body: data },
//       );
//       const fileData = await res.json();

//       await addDoc(collection(db, "reviews"), {
//         username: verificationData.customerName,
//         orderId: verificationData.orderId,
//         imageUrl: fileData.secure_url,
//         comment: formData.comment,
//         rating: formData.rating,
//         createdAt: Timestamp.now(),
//         purchaseVerified: true,
//       });

//       setOrderVerified(false);
//       setActiveMode("view");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body">
//       <main className="max-w-[1400px] mx-auto pt-32 md:pt-40 pb-20 px-6 sm:px-12">
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2 mb-10 text-foreground/40 hover:text-primary transition-colors cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           <span className="text-[10px] font-black uppercase tracking-widest">
//             Return to Home
//           </span>
//         </button>

//         <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
//           <div>
//             <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase">
//               THE <span className="text-primary italic">CIRCLE.</span>
//             </h1>
//             <p className="text-muted-foreground mt-4 text-sm sm:text-lg font-bold uppercase tracking-[0.2em]">
//               Verified community setups
//             </p>
//           </div>
//           <button
//             onClick={() =>
//               setActiveMode(activeMode === "view" ? "write" : "view")
//             }
//             className="flex items-center gap-3 px-8 py-5 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-sm bg-primary"
//           >
//             {activeMode === "write" ? (
//               <ImageIcon size={20} />
//             ) : (
//               <PenTool size={20} />
//             )}
//             {activeMode === "write" ? "VIEW REVIEWS" : "WRITE A REVIEW"}
//           </button>
//         </header>

//         {activeMode === "write" ? (
//           <section className="bg-white border-4 border-foreground p-8 sm:p-12 shadow-[12px_12px_0px_0px_#00D4FF]">
//             <div className="grid md:grid-cols-[1fr_2px_1fr] gap-10">
//               <form onSubmit={handleVerifyOrder} className="space-y-6">
//                 <h2 className="text-2xl font-black uppercase">
//                   1. Verify Purchase
//                 </h2>
//                 <input
//                   required
//                   className="w-full border-2 border-foreground p-4 font-bold"
//                   placeholder="ORDER ID (E.G. IMP-1001)"
//                   value={verificationData.orderId}
//                   onChange={(e) =>
//                     setVerificationData({
//                       ...verificationData,
//                       orderId: e.target.value,
//                     })
//                   }
//                 />
//                 <input
//                   required
//                   className="w-full border-2 border-foreground p-4 font-bold"
//                   placeholder="FULL NAME"
//                   value={verificationData.customerName}
//                   onChange={(e) =>
//                     setVerificationData({
//                       ...verificationData,
//                       customerName: e.target.value,
//                     })
//                   }
//                 />
//                 <Button
//                   disabled={verifyingOrder || orderVerified}
//                   className="w-full h-16 bg-foreground text-background font-black rounded-none"
//                 >
//                   {orderVerified
//                     ? "VERIFIED ✓"
//                     : verifyingOrder
//                       ? "VERIFYING..."
//                       : "VERIFY ORDER"}
//                 </Button>
//               </form>

//               <div className="hidden md:block bg-foreground/10 h-full w-[2px]" />

//               <form
//                 onSubmit={handlePublishReview}
//                 className={`space-y-6 ${!orderVerified ? "opacity-30 pointer-events-none" : ""}`}
//               >
//                 <h2 className="text-2xl font-black uppercase">2. Post Setup</h2>
//                 <div className="relative border-4 border-dotted border-foreground/20 h-48 flex items-center justify-center overflow-hidden">
//                   {previewUrl ? (
//                     <img
//                       src={previewUrl}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                   ) : (
//                     <Upload />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                   />
//                 </div>
//                 <textarea
//                   required
//                   className="w-full border-2 border-foreground p-4 font-medium"
//                   placeholder="YOUR REVIEW..."
//                   value={formData.comment}
//                   onChange={(e) =>
//                     setFormData({ ...formData, comment: e.target.value })
//                   }
//                 />
//                 <Button
//                   disabled={submitting}
//                   className="w-full h-16 bg-primary text-black font-black rounded-none"
//                 >
//                   {submitting ? "UPLOADING..." : "PUBLISH REVIEW"}
//                 </Button>
//               </form>
//             </div>
//           </section>
//         ) : (
//           <section>
//             {loading ? (
//               <div className="h-96 flex items-center justify-center">
//                 <Loader2 className="animate-spin" size={48} />
//               </div>
//             ) : (
//               <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
//                 {reviews.map((review) => (
//                   <div
//                     key={review.id}
//                     className="break-inside-avoid bg-white border-4 border-foreground p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
//                   >
//                     <img
//                       src={review.imageUrl}
//                       className="w-full aspect-[4/5] object-cover border-2 border-foreground mb-4"
//                       alt="Setup"
//                     />
//                     <h3 className="font-black uppercase text-xl">
//                       {review.username}
//                     </h3>
//                     <div className="flex text-primary mb-2">
//                       {[...Array(review.rating)].map((_, i) => (
//                         <Star key={i} size={14} fill="currentColor" />
//                       ))}
//                     </div>
//                     <p className="text-sm font-bold uppercase italic border-t-2 border-foreground/10 pt-4">
//                       "{review.comment}"
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ReviewPage;

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Star,
  Upload,
  Loader2,
  CheckCircle,
  PenTool,
  Image as ImageIcon,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Review {
  id: string;
  username: string;
  comment: string;
  rating: number;
  imageUrl: string;
  createdAt: Timestamp;
  orderId: string;
  purchaseVerified: boolean;
}

interface VerificationData {
  orderId: string;
  customerName: string;
}

interface ReviewFormData {
  comment: string;
  rating: number;
}

const ReviewPage = (): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<"view" | "write">("view");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const [verificationData, setVerificationData] = useState<VerificationData>({
    orderId: "",
    customerName: "",
  });
  const [verifyingOrder, setVerifyingOrder] = useState<boolean>(false);
  const [orderVerified, setOrderVerified] = useState<boolean>(false);

  const [formData, setFormData] = useState<ReviewFormData>({
    comment: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        setIsAdmin(user?.email === "support.imprinto@gmail.com");
      },
    );

    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribeReviews = onSnapshot(q, (snapshot) => {
      const reviewData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Review, "id">),
      }));
      setReviews(reviewData);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeReviews();
    };
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVerifyOrder = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setVerifyingOrder(true);
    const q = query(
      collection(db, "orders"),
      where("orderId", "==", verificationData.orderId),
      where("customerName", "==", verificationData.customerName),
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setOrderVerified(true);
      } else {
        alert("Verification failed. Check your ID and Name.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerifyingOrder(false);
    }
  };

  const handleDeleteReview = async (id: string): Promise<void> => {
    if (!window.confirm("Purge this review from the wall?")) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Action failed. Check permissions.");
    }
  };

  const handlePublishReview = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!imageFile) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "poster_reviews");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload",
        { method: "POST", body: data },
      );
      const fileData = await res.json();

      if (!fileData.secure_url) throw new Error("Cloudinary upload failed");

      await addDoc(collection(db, "reviews"), {
        username: verificationData.customerName,
        orderId: verificationData.orderId,
        imageUrl: fileData.secure_url,
        comment: formData.comment,
        rating: formData.rating,
        createdAt: Timestamp.now(),
        purchaseVerified: true,
      });

      setOrderVerified(false);
      setFormData({ comment: "", rating: 5 });
      setImageFile(null);
      setPreviewUrl(null);
      setActiveMode("view");
    } catch (err) {
      console.error(err);
      alert("Publish failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main className="max-w-[1400px] mx-auto pt-32 md:pt-40 pb-20 px-6 sm:px-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-10 text-foreground/40 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Return to Home
          </span>
        </button>

        <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase">
              THE <span className="text-primary italic">CIRCLE.</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-lg font-bold uppercase tracking-[0.2em]">
              Verified community setups
            </p>
          </div>
          <button
            onClick={() =>
              setActiveMode(activeMode === "view" ? "write" : "view")
            }
            className="flex items-center gap-3 px-8 py-5 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-sm bg-primary"
          >
            {activeMode === "write" ? (
              <ImageIcon size={20} />
            ) : (
              <PenTool size={20} />
            )}
            {activeMode === "write" ? "VIEW REVIEWS" : "WRITE A REVIEW"}
          </button>
        </header>

        {activeMode === "write" ? (
          <section className="bg-white border-4 border-foreground p-8 sm:p-12 shadow-[12px_12px_0px_0px_#00D4FF]">
            <div className="grid md:grid-cols-[1fr_2px_1fr] gap-10">
              <form onSubmit={handleVerifyOrder} className="space-y-6">
                <h2 className="text-2xl font-black uppercase">
                  1. Verify Purchase
                </h2>
                <input
                  required
                  className="w-full border-2 border-foreground p-4 font-bold"
                  placeholder="ORDER ID (E.G. IMP-1001)"
                  value={verificationData.orderId}
                  onChange={(e) =>
                    setVerificationData({
                      ...verificationData,
                      orderId: e.target.value,
                    })
                  }
                />
                <input
                  required
                  className="w-full border-2 border-foreground p-4 font-bold"
                  placeholder="FULL NAME"
                  value={verificationData.customerName}
                  onChange={(e) =>
                    setVerificationData({
                      ...verificationData,
                      customerName: e.target.value,
                    })
                  }
                />
                <Button
                  disabled={verifyingOrder || orderVerified}
                  className="w-full h-16 bg-foreground text-background font-black rounded-none"
                >
                  {orderVerified
                    ? "VERIFIED ✓"
                    : verifyingOrder
                      ? "VERIFYING..."
                      : "VERIFY ORDER"}
                </Button>
              </form>

              <div className="hidden md:block bg-foreground/10 h-full w-[2px]" />

              <form
                onSubmit={handlePublishReview}
                className={`space-y-6 ${!orderVerified ? "opacity-30 pointer-events-none" : ""}`}
              >
                <h2 className="text-2xl font-black uppercase">2. Post Setup</h2>
                <div className="relative border-4 border-dotted border-foreground/20 h-48 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <Upload />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <textarea
                  required
                  className="w-full border-2 border-foreground p-4 font-medium"
                  placeholder="YOUR REVIEW..."
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                />
                <Button
                  disabled={submitting}
                  className="w-full h-16 bg-primary text-black font-black rounded-none"
                >
                  {submitting ? "UPLOADING..." : "PUBLISH REVIEW"}
                </Button>
              </form>
            </div>
          </section>
        ) : (
          <section>
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <Loader2 className="animate-spin" size={48} />
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="relative break-inside-avoid bg-white border-4 border-foreground p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
                  >
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="absolute top-2 right-2 z-10 p-2 bg-accent text-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <img
                      src={review.imageUrl}
                      className="w-full aspect-[4/5] object-cover border-2 border-foreground mb-4"
                      alt="Setup"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-black uppercase text-xl leading-none">
                        {review.username}
                      </h3>
                      {review.purchaseVerified && (
                        <CheckCircle size={16} className="text-accent-lime" />
                      )}
                    </div>
                    <div className="flex text-primary mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm font-bold uppercase italic border-t-2 border-foreground/10 pt-4">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default ReviewPage;