const Marquee = () => {
  const items = [
    "LIMITED DROP — JDM SERIES 01",
    "FREE DELIVERY OVER ₹499",
    "VANDAL-PROOF VINYL",
    "LIMITED DROP — JDM SERIES 01",
    "FREE DELIVERY OVER ₹499",
  ];

  return (
    <div className="bg-primary overflow-hidden py-2.5">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-xs tracking-widest text-primary-foreground mx-8 font-bold uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
