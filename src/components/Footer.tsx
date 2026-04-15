// import { Link } from "react-router-dom";
// import {
//   Instagram,
//   Twitter,
//   Facebook,
//   Mail,
//   MapPin,
//   ArrowRight,
// } from "lucide-react";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-background text-foreground border-t-4 border-foreground pt-24 pb-12 font-body selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
//           {/* Brand Identity */}
//           <div className="flex flex-col gap-8">
//             <Link to="/" className="inline-block group">
//               <img
//                 src="/logo.png"
//                 alt="Imprinto Co."
//                 className="h-10 w-auto brightness-0 transition-transform group-hover:scale-105"
//               />
//             </Link>
//             <p className="text-foreground/60 text-sm font-bold leading-relaxed max-w-xs uppercase tracking-tight">
//               Crafting premium matte posters and high-grip vinyls for the
//               community. No generic prints, just raw obsession. Designed and
//               shipped from the heart of India.
//             </p>
//             <div className="flex gap-4">
//               <SocialLink href="#" icon={<Instagram size={20} />} />
//               <SocialLink href="#" icon={<Twitter size={20} />} />
//               <SocialLink href="#" icon={<Facebook size={20} />} />
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-display text-xl font-black uppercase tracking-tighter mb-8 border-b-2 border-primary inline-block">
//               The Vaults
//             </h4>
//             <ul className="flex flex-col gap-4">
//               <FooterLink to="/shop?cat=f1" label="Motorsport" />
//               <FooterLink to="/shop?cat=anime" label="Anime Core" />
//               <FooterLink to="/shop?cat=movies" label="Cinema Classics" />
//               <FooterLink to="/shop?cat=stickers" label="Vinyl Stickers" />
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="font-display text-xl font-black uppercase tracking-tighter mb-8 border-b-2 border-accent inline-block">
//               Support
//             </h4>
//             <ul className="flex flex-col gap-4">
//               <FooterLink to="/about" label="The Story" />
//               <FooterLink to="/shipping-policy" label="Shipping" />
//               <FooterLink to="/returns" label="Returns" />
//               <FooterLink to="/contact" label="Contact Us" />
//             </ul>
//           </div>

//           {/* Connect */}
//           <div className="flex flex-col">
//             <h4 className="font-display text-xl font-black uppercase tracking-tighter mb-8 border-b-2 border-accent-lime inline-block">
//               Connect
//             </h4>
//             <div className="flex flex-col gap-5">
//               <div className="flex items-center gap-4 text-foreground/50 group hover:text-primary transition-colors cursor-pointer">
//                 <Mail size={18} />
//                 <span className="text-xs font-black tracking-widest uppercase">
//                   hello@imprinto.com
//                 </span>
//               </div>
//               <div className="flex items-center gap-4 text-foreground/50">
//                 <MapPin size={18} />
//                 <span className="text-xs font-black tracking-widest uppercase">
//                   Jaipur, Rajasthan
//                 </span>
//               </div>

//               <div className="mt-6 p-6 bg-white border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
//                 <p className="text-[10px] font-black uppercase text-foreground mb-4 tracking-[0.2em]">
//                   Join the Obsession
//                 </p>
//                 <div className="flex border-b-2 border-foreground pb-2 group focus-within:border-primary transition-colors">
//                   <input
//                     type="email"
//                     placeholder="ENTER EMAIL"
//                     className="bg-transparent border-none outline-none text-xs font-black w-full placeholder:text-foreground/20"
//                   />
//                   <button className="text-foreground hover:text-primary transition-all">
//                     <ArrowRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-12 border-t-2 border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
//           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
//             <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em]">
//               &copy; {currentYear} Imprinto Co. Raw & Authentic.
//             </p>
//             <div className="flex gap-6">
//               <Link
//                 to="/privacy"
//                 className="text-[9px] font-black text-foreground/20 hover:text-foreground uppercase tracking-widest transition-colors"
//               >
//                 Privacy
//               </Link>
//               <Link
//                 to="/terms"
//                 className="text-[9px] font-black text-foreground/20 hover:text-foreground uppercase tracking-widest transition-colors"
//               >
//                 Terms
//               </Link>
//             </div>
//           </div>

//           <div className="flex items-center gap-8 opacity-20 grayscale">
//             <div className="font-black text-[10px] tracking-tighter uppercase">
//               UPI
//             </div>
//             <div className="font-black text-[10px] tracking-tighter uppercase">
//               Visa
//             </div>
//             <div className="font-black text-[10px] tracking-tighter uppercase">
//               Mastercard
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const SocialLink = ({
//   href,
//   icon,
// }: {
//   href: string;
//   icon: React.ReactNode;
// }) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noreferrer"
//     className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
//   >
//     {icon}
//   </a>
// );

// const FooterLink = ({ to, label }: { to: string; label: string }) => (
//   <li>
//     <Link
//       to={to}
//       className="text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary hover:translate-x-2 transition-all block"
//     >
//       {label}
//     </Link>
//   </li>
// );

// export default Footer;

import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t-2 md:border-t-4 border-foreground pt-16 md:pt-24 pb-8 md:pb-12 font-body selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Brand Identity */}
          <div className="flex flex-col gap-6 md:gap-8">
            <Link to="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="Imprinto Co."
                className="h-8 md:h-10 w-auto brightness-0 transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-foreground/60 text-xs md:text-sm font-bold leading-relaxed max-w-xs uppercase tracking-tight">
              Crafting premium matte posters and high-grip vinyls for the
              community. No generic prints, just raw obsession. Designed and
              shipped from the heart of India.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pt-2">
            <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-primary inline-block">
              The Vaults
            </h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              <FooterLink to="/shop?cat=f1" label="Motorsport" />
              <FooterLink to="/shop?cat=anime" label="Anime Core" />
              <FooterLink to="/shop?cat=movies" label="Cinema Classics" />
              <FooterLink to="/shop?cat=stickers" label="Vinyl Stickers" />
            </ul>
          </div>

          {/* Support */}
          <div className="sm:pt-2">
            <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-accent inline-block">
              Support
            </h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              <FooterLink to="/about" label="The Story" />
              <FooterLink to="/shipping-policy" label="Shipping" />
              <FooterLink to="/returns" label="Returns" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col sm:pt-2">
            <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-accent-lime inline-block">
              Connect
            </h4>
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex items-center gap-3 text-foreground/50 group hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">
                  hello@imprinto.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-foreground/50">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">
                  Jaipur, Rajasthan
                </span>
              </div>

              <div className="mt-4 p-5 md:p-6 bg-white border-2 border-foreground shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-foreground mb-3 md:mb-4 tracking-[0.2em]">
                  Join the Obsession
                </p>
                <div className="flex border-b-2 border-foreground pb-2 group focus-within:border-primary transition-colors">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="bg-transparent border-none outline-none text-[10px] md:text-xs font-black w-full placeholder:text-foreground/20"
                  />
                  <button className="text-foreground hover:text-primary transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t-2 border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[9px] md:text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center md:text-left">
              &copy; {currentYear} Imprinto Co. Raw & Authentic.
            </p>
            <div className="flex gap-4 md:gap-6">
              <Link
                to="/privacy"
                className="text-[8px] md:text-[9px] font-black text-foreground/20 hover:text-foreground uppercase tracking-widest transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-[8px] md:text-[9px] font-black text-foreground/20 hover:text-foreground uppercase tracking-widest transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8 opacity-20 grayscale scale-90 md:scale-100">
            <div className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
              UPI
            </div>
            <div className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
              Visa
            </div>
            <div className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
              Mastercard
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 md:w-12 md:h-12 border-2 border-foreground flex items-center justify-center hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link
      to={to}
      className="text-[10px] md:text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary hover:translate-x-2 transition-all block"
    >
      {label}
    </Link>
  </li>
);

export default Footer;