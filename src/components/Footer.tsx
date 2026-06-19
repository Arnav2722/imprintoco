// import { Link } from "react-router-dom";
// import { Instagram, Twitter, Facebook, Mail, ArrowRight } from "lucide-react";

// const Footer = (): JSX.Element => {
//   const currentYear: number = new Date().getFullYear();

//   return (
//     <footer className="bg-background text-foreground border-t-2 md:border-t-4 border-foreground pt-16 md:pt-24 pb-8 md:pb-12 font-body selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-5 md:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
//           {/* Brand Identity */}
//           <div className="flex flex-col gap-6 md:gap-8">
//             <Link to="/" className="inline-block group">
//               <img
//                 src="/logo.png"
//                 alt="Imprinto Co."
//                 className="h-8 md:h-10 w-auto brightness-0 transition-transform group-hover:scale-105"
//               />
//             </Link>
//             <p className="text-foreground/60 text-xs md:text-sm font-bold leading-relaxed max-w-xs uppercase tracking-tight">
//               Crafting premium matte posters and high-grip vinyls for the
//               community. No generic prints, just raw obsession. Designed and
//               shipped from the heart of India.
//             </p>
//             <div className="flex gap-4">
//               <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
//               <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
//               <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="sm:pt-2">
//             <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-primary inline-block">
//               The Store
//             </h4>
//             <ul className="flex flex-col gap-3 md:gap-4">
//               <FooterLink to="/shop?sub=f1" label="Motorsport" />
//               <FooterLink to="/shop?sub=anime" label="Anime Core" />
//               <FooterLink to="/shop?sub=movies" label="Cinema Classics" />
//               <FooterLink to="/shop?cat=stickers" label="Vinyl Stickers" />
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="sm:pt-2">
//             <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-accent inline-block">
//               Support
//             </h4>
//             <ul className="flex flex-col gap-3 md:gap-4">
//               <FooterLink to="/about" label="The Story" />
//               <FooterLink to="/track-order" label="Track Order" />
//               <FooterLink to="/faqs" label="Help Center" />
//               <FooterLink to="/contact" label="Contact Us" />
//             </ul>
//           </div>

//           {/* Connect */}
//           <div className="flex flex-col sm:pt-2">
//             <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-2 border-accent-lime inline-block">
//               Connect
//             </h4>
//             <div className="flex flex-col gap-4 md:gap-5">
//               <div className="flex items-center gap-3 text-foreground/50 group hover:text-primary transition-colors cursor-pointer">
//                 <Mail className="w-4 h-4" />
//                 <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">
//                   support.imprinto@gmail.com
//                 </span>
//               </div>
//               <div className="mt-4 p-4 border-2 border-dashed border-foreground/10 bg-muted/30">
//                 <p className="text-[9px] font-black uppercase text-foreground/40 mb-2 tracking-widest">
//                   Registry Status
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
//                   <span className="text-[10px] font-black uppercase">
//                     Fulfillment Active
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar - LEGAL PROTOCOL */}
//         <div className="pt-8 md:pt-12 border-t-2 border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
//           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
//             <p className="text-[9px] md:text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center md:text-left">
//               &copy; {currentYear} Imprinto Co. Raw & Authentic.
//             </p>

//             {/* ADDED LEGAL LINKS */}
//             <div className="flex flex-wrap justify-center gap-4 md:gap-6 border-l-0 md:border-l-2 border-foreground/5 md:pl-10">
//               <Link
//                 to="/privacy-policy"
//                 className="text-[8px] md:text-[9px] font-black text-foreground/30 hover:text-primary uppercase tracking-widest transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 to="/terms-conditions"
//                 className="text-[8px] md:text-[9px] font-black text-foreground/30 hover:text-primary uppercase tracking-widest transition-colors"
//               >
//                 Terms & Conditions
//               </Link>
//               <Link
//                 to="/return-policy"
//                 className="text-[8px] md:text-[9px] font-black text-foreground/30 hover:text-primary uppercase tracking-widest transition-colors"
//               >
//                 Return & Refund
//               </Link>
//               <Link
//                 to="/shipping-policy"
//                 className="text-[8px] md:text-[9px] font-black text-foreground/30 hover:text-primary uppercase tracking-widest transition-colors"
//               >
//                 Shipping Policy
//               </Link>
//             </div>
//           </div>

//           {/* Payment Badges */}
//           <div className="flex items-center gap-6 md:gap-8 opacity-20 grayscale scale-90 md:scale-100">
//             <span className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
//               UPI
//             </span>
//             <span className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
//               Visa
//             </span>
//             <span className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
//               Mastercard
//             </span>
//             <span className="font-black text-[9px] md:text-[10px] tracking-tighter uppercase">
//               RuPay
//             </span>
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
//     className="w-10 h-10 md:w-12 md:h-12 border-2 border-foreground flex items-center justify-center hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
//   >
//     {icon}
//   </a>
// );

// const FooterLink = ({ to, label }: { to: string; label: string }) => (
//   <li>
//     <Link
//       to={to}
//       className="text-[10px] md:text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary hover:translate-x-2 transition-all block"
//     >
//       {label}
//     </Link>
//   </li>
// );

// export default Footer;

import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail, Phone } from "lucide-react";

const Footer = (): JSX.Element => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t-4 border-foreground pt-12 md:pt-24 pb-8 md:pb-12 selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Brand Identity */}
          <div className="flex flex-col gap-6 md:gap-8 items-start">
            <Link to="/" className="group">
              <img
                src="/MainLogo2.png"
                alt="Imprinto Co."
                className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-foreground/60 text-[8px] md:text-[10px] font-black leading-relaxed max-w-xs uppercase tracking-tight">
              Crafting premium matte posters and high-grip vinyls for the
              community. No generic prints, just raw obsession. Designed and
              shipped from the heart of India.
            </p>
            <div className="flex gap-4">
              <SocialLink
                href="https://www.instagram.com/imprinto.store"
                icon={<Instagram size={18} strokeWidth={3} />}
              />
              <SocialLink
                href="https://x.com/ImprintoStore"
                icon={<Twitter size={18} strokeWidth={3} />}
              />
              {/* <SocialLink
                href="#"
                icon={<Facebook size={18} strokeWidth={3} />}
              /> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-4 border-primary inline-block">
              The Store
            </h4>
            <ul className="flex flex-col gap-4">
              <FooterLink to="/shop?sub=f1" label="Motorsport" />
              <FooterLink to="/shop?sub=anime" label="Anime Core" />
              <FooterLink to="/shop?sub=movies" label="Cinema" />
              <FooterLink to="/shop?cat=stickers" label="Vinyls" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-4 border-accent inline-block">
              Support
            </h4>
            <ul className="flex flex-col gap-4">
              {/* <FooterLink to="/track-order" label="Track" /> */}
              <FooterLink to="/faqs" label="Help" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/shipping-policy" label="Shipping" />
            </ul>
          </div>

          {/* Status Panel */}
          <div className="flex flex-col">
            <h4 className="font-display text-sm md:text-xl font-black uppercase tracking-tighter mb-6 md:mb-8 border-b-4 border-accent-lime inline-block">
              Contact Us
            </h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 text-foreground/50 hover:text-primary transition-colors cursor-pointer">
                <Mail size={16} strokeWidth={3} />
                <span className="text-[7px] md:text-[9px] font-black tracking-widest uppercase">
                  support.imprinto@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-foreground/50 hover:text-primary transition-colors cursor-pointer">
                <Phone size={16} strokeWidth={3} />
                <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase">
                  +91 9635287415
                </span>
              </div>
              {/* <div className="p-4 border-2 border-dashed border-foreground/10 bg-muted/30">
                <p className="text-[7px] font-black uppercase text-foreground/40 mb-2 tracking-widest">
                  Registry Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  <span className="text-[8px] font-black uppercase">
                    Fulfillment Active
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t-2 border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p className="text-[7px] md:text-[9px] font-black text-foreground/40 uppercase tracking-widest text-center">
              &copy; {currentYear} Imprinto Co. Raw & Authentic.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <LegalLink to="/privacy-policy" label="Privacy" />
              <LegalLink to="/terms-conditions" label="Terms" />
              <LegalLink to="/return-policy" label="Returns" />
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-6 opacity-20 grayscale">
            <span className="font-black text-[7px] md:text-[9px] uppercase">
              UPI
            </span>
            <span className="font-black text-[7px] md:text-[9px] uppercase">
              Visa
            </span>
            <span className="font-black text-[7px] md:text-[9px] uppercase">
              Mastercard
            </span>
            <span className="font-black text-[7px] md:text-[9px] uppercase">
              RuPay
            </span>
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
    className="w-10 h-10 md:w-12 md:h-12 border-2 border-foreground flex items-center justify-center hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link
      to={to}
      className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-all block"
    >
      {label}
    </Link>
  </li>
);

const LegalLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="text-[6px] md:text-[8px] font-black text-foreground/30 hover:text-primary uppercase tracking-widest transition-colors"
  >
    {label}
  </Link>
);

export default Footer;
