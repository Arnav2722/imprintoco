import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-low py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-display text-lg font-bold tracking-widest mb-4">Imprinto Co.</h3>
            <p className="text-muted-foreground text-xs font-body leading-relaxed">
              The original source for underground car and bike artifacts.
              Designed and shipped from the streets.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest text-muted-foreground mb-4 uppercase">
              EXPLORE
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop?cat=stickers" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">Stickers</Link>
              <Link to="/shop?cat=posters" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">Posters</Link>
              <Link to="/shop?cat=combo" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">Combo Packs</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest text-muted-foreground mb-4 uppercase">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">About</Link>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">Instagram</a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-foreground text-sm font-body hover:text-primary transition-colors duration-150">WhatsApp</a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest text-muted-foreground mb-4 uppercase">
              JOIN THE UNDERGROUND
            </h4>
            <p className="text-muted-foreground text-xs font-body mb-4">
              Get RTD of deals, exclusive drops, and culture.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-surface-highest text-foreground text-sm font-body px-4 py-2 flex-1 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
              <button className="bg-primary text-primary-foreground font-display text-xs tracking-wider px-4 py-2 hover:brightness-110 transition-all duration-150">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: '1px solid hsl(0 0% 15%)' }}>
          <p className="text-muted-foreground text-[10px] font-display tracking-widest">
            © 2026 Imprinto Co. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
