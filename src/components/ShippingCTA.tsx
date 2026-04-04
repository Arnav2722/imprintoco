import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ShippingCTA = () => {
  const [time, setTime] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[0.95] mb-4">
          FREE SHIPPING
          <br />
          ENDS SOON
        </h2>
        <p className="font-display text-sm tracking-widest text-primary-foreground/70 mb-8 uppercase">
          ON ALL ORDERS ABOVE ₹499
        </p>

        <div className="flex justify-center gap-3 mb-10">
          {[
            { val: pad(time.hours), label: "HRS" },
            { val: pad(time.minutes), label: "MIN" },
            { val: pad(time.seconds), label: "SEC" },
          ].map((unit) => (
            <div key={unit.label} className="bg-primary-foreground/20 px-4 py-3 min-w-[60px]">
              <span className="font-display text-2xl font-bold text-primary-foreground block">
                {unit.val}
              </span>
              <span className="font-display text-[9px] tracking-widest text-primary-foreground/60">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <Button variant="secondary" size="lg" asChild>
          <Link to="/shop">CLAIM DEAL</Link>
        </Button>
      </div>
    </section>
  );
};

export default ShippingCTA;
