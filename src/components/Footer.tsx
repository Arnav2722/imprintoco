// import { Link } from "react-router-dom";
// import {
//   Instagram,
//   Twitter,
//   Facebook,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#050505] text-white border-t border-white/5 pt-20 pb-10">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//           {/* Brand Identity */}
//           <div className="flex flex-col gap-6">
//             <Link to="/" className="inline-block">
//               <h2 className="font-bricolage text-3xl font-black italic tracking-tighter uppercase">
//                 Imprinto<span className="text-primary not-italic">.</span>
//               </h2>
//             </Link>
//             <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
//               Premium Waterproof Stickers and Matte Finish Posters. Built for
//               the fans who live for the thrill. Own your obsession.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
//               >
//                 <Instagram size={18} />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
//               >
//                 <Twitter size={18} />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
//               >
//                 <Facebook size={18} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
//               Collections
//             </h4>
//             <ul className="flex flex-col gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
//               <li>
//                 <Link
//                   to="/shop?cat=f1"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Motorsport
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shop?cat=anime"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Anime Art
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shop?cat=movies"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Cinema Classics
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shop?cat=stickers"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Vinyl Stickers
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
//               Support
//             </h4>
//             <ul className="flex flex-col gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
//               <li>
//                 <Link
//                   to="/about"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Our Story
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shipping-policy"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Shipping Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/returns"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Returns & Refund
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter / Contact */}
//           <div>
//             <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
//               Connect
//             </h4>
//             <div className="flex flex-col gap-4">
//               <div className="flex items-center gap-3 text-gray-500">
//                 <Mail size={16} className="text-primary" />
//                 <span className="text-xs font-bold tracking-widest uppercase">
//                   support@imprinto.com
//                 </span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-500">
//                 <MapPin size={16} className="text-primary" />
//                 <span className="text-xs font-bold tracking-widest uppercase">
//                   Jaipur, Rajasthan, India
//                 </span>
//               </div>

//               {/* Mini Newsletter */}
//               <div className="mt-4">
//                 <p className="text-[10px] font-black uppercase text-gray-600 mb-3 tracking-[0.2em]">
//                   Join the obsession
//                 </p>
//                 <div className="flex border-b border-white/20 pb-2">
//                   <input
//                     type="email"
//                     placeholder="ENTER EMAIL"
//                     className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:text-gray-700"
//                   />
//                   <button className="text-primary text-xs font-black italic hover:translate-x-1 transition-transform">
//                     JOIN
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
//           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
//             &copy; {currentYear} Imprinto Co. All Rights Reserved.
//           </p>
//           <div className="flex items-center gap-6 opacity-30 grayscale pointer-events-none">
//             {/* Payment Icons Placeholder */}
//             <span className="text-[10px] font-black uppercase tracking-widest">
//               UPI
//             </span>
//             <span className="text-[10px] font-black uppercase tracking-widest">
//               VISA
//             </span>
//             <span className="text-[10px] font-black uppercase tracking-widest">
//               MASTERCARD
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Imprinto Co." className="h-10 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              Premium Waterproof Stickers and Matte Finish Posters. Built for
              the fans who live for the thrill. Own your obsession.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
              Collections
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <li>
                <Link
                  to="/shop?cat=f1"
                  className="hover:text-primary transition-colors"
                >
                  Motorsport
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=anime"
                  className="hover:text-primary transition-colors"
                >
                  Anime Art
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=movies"
                  className="hover:text-primary transition-colors"
                >
                  Cinema Classics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=stickers"
                  className="hover:text-primary transition-colors"
                >
                  Vinyl Stickers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-primary transition-colors"
                >
                  Returns & Refund
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bricolage text-lg font-black italic uppercase tracking-tighter mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={16} className="text-primary" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  support@imprinto.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin size={16} className="text-primary" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  Jaipur, Rajasthan, India
                </span>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-black uppercase text-gray-600 mb-3 tracking-[0.2em]">
                  Join the obsession
                </p>
                <div className="flex border-b border-white/20 pb-2">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:text-gray-700"
                  />
                  <button className="text-primary text-xs font-black italic hover:translate-x-1 transition-transform">
                    JOIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
            &copy; {currentYear} Imprinto Co. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 opacity-30 grayscale pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-widest">
              UPI
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              VISA
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              MASTERCARD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;