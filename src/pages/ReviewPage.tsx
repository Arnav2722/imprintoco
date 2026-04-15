import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Star, Upload, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    comment: "",
    rating: 5,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Upload a photo of your poster.");
    setSubmitting(true);

    try {
      // 1. Cloudinary Upload
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "your_unsigned_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        { method: "POST", body: data },
      );
      const fileData = await res.json();
      const imageUrl = fileData.secure_url;

      // 2. Firebase Save
      await addDoc(collection(db, "reviews"), {
        ...formData,
        imageUrl,
        createdAt: new Date(),
      });

      setFormData({ username: "", comment: "", rating: 5 });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 h-20 flex items-center px-6 sm:px-12">
        <Link to="/" className="flex items-center gap-2 group">
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-black uppercase tracking-tighter">
            Back to Vault
          </span>
        </Link>
      </nav>

      <main className="max-w-[1400px] mx-auto pt-32 pb-20 px-6 sm:px-12">
        <header className="mb-16">
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase">
            THE <span className="text-primary italic">FEEDBACK.</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm sm:text-lg font-bold uppercase tracking-[0.2em]">
            Verified obsessions from the community
          </p>
        </header>

        <div className="grid lg:grid-cols-[450px_1fr] gap-12 xl:gap-20">
          {/* Submission Form */}
          <section>
            <form
              onSubmit={handleSubmit}
              className="bg-white border-4 border-foreground p-6 sm:p-10 shadow-[12px_12px_0px_0px_#00D4FF]"
            >
              <h2 className="text-2xl font-black uppercase mb-8">
                Add to the vault
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                    Display Name
                  </label>
                  <input
                    required
                    className="w-full border-2 border-foreground p-4 focus:bg-primary/5 outline-none font-bold"
                    placeholder="E.G. BRUCE W."
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                    Poster Photo
                  </label>
                  <div className="relative border-4 border-dotted border-foreground/20 h-48 flex flex-col items-center justify-center hover:border-primary transition-all group overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                          Drop File or Click
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: num })
                        }
                        className={`flex-1 h-12 border-2 border-foreground font-black transition-colors ${formData.rating >= num ? "bg-primary" : "bg-transparent text-foreground/30"}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                    Your Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full border-2 border-foreground p-4 focus:bg-primary/5 outline-none font-medium"
                    placeholder="QUALITY, VIBE, SHIPPING..."
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  />
                </div>

                <Button
                  disabled={submitting}
                  className="w-full h-20 bg-foreground text-background font-black text-lg rounded-none hover:bg-primary hover:text-foreground transition-all"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "PUBLISH REVIEW"
                  )}
                </Button>
              </div>
            </form>
          </section>

          {/* Feed */}
          <section>
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : (
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="break-inside-avoid bg-white border-2 border-foreground/10 hover:border-foreground p-4 transition-all"
                  >
                    <div className="aspect-[4/5] bg-muted mb-4 overflow-hidden border-2 border-foreground/5">
                      <img
                        src={review.imageUrl}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        alt="Customer Display"
                      />
                    </div>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <h3 className="font-black uppercase text-xl leading-none">
                          {review.username}
                        </h3>
                        <div className="flex text-primary mt-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <CheckCircle size={16} className="text-accent-lime" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;
