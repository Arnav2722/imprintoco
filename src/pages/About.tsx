import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import lifestylePoster from "@/assets/lifestyle-poster.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 max-w-2xl">
            WE DON'T DO
            <br />
            <span className="text-primary">CLEAN.</span>
          </h1>

          <div className="grid md:grid-cols-[40%_60%] gap-12 mb-20">
            <div>
              <p className="text-foreground font-body text-sm leading-relaxed mb-6">
                Imprinto Co. was born from late-night garage sessions, the smell of fresh vinyl, and a
                refusal to settle for generic wall art. We design stickers and posters for people
                who live and breathe automotive culture.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Every piece in our catalog is designed in-house, printed on premium materials,
                and tested to survive the street. From JDM legends to MotoGP beasts, from F1
                icons to raw motivational typography—we make artifacts, not merchandise.
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We ship across India. No corporate BS. No templated designs.
                Just raw, underground automotive art.
              </p>
            </div>
            <div className="overflow-hidden">
              <img
                src={lifestylePoster}
                alt="Velocity lifestyle"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1200}
                height={600}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: "500+", label: "DESIGNS SHIPPED" },
              { num: "10K+", label: "STICKERS SOLD" },
              { num: "4.9★", label: "AVG RATING" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-low p-10">
                <span className="font-display text-4xl font-bold text-primary block mb-2">
                  {stat.num}
                </span>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
