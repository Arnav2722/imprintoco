const testimonials = [
  {
    text: "Finally found stickers that don't peel off in the rain. The JDM pack is insane quality for ₹149.",
    author: "@RAHUL_BOOSTED",
    stars: 5,
  },
  {
    text: "The posters changed my whole room vibe. Space Grotesk quotes are fire. Ordering more next week.",
    author: "@ANANYA_DGS",
    stars: 5,
  },
  {
    text: "₹199 for 5 stickers is a steal. Shipping was fast too. No corporate BS. Just good artifacts.",
    author: "@DRIFT_KING_24",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">STREET CRED</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-surface-container p-8">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-primary text-sm">★</span>
                ))}
              </div>
              <p className="text-foreground text-sm font-body mb-6 leading-relaxed">"{t.text}"</p>
              <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
                {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
