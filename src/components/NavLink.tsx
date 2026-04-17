// import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
// import { forwardRef } from "react";
// import { cn } from "@/lib/utils";

// interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
//   className?: string;
//   activeClassName?: string;
//   pendingClassName?: string;
// }

// /**
//  * Custom NavLink wrapper for 2026 Imprinto Design System.
//  * Supports dynamic class merging for active and pending states.
//  */
// const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
//   ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
//     return (
//       <RouterNavLink
//         ref={ref}
//         to={to}
//         className={({ isActive, isPending }) =>
//           cn(
//             "transition-all duration-300", // Standard transition for all nav links
//             className,
//             isActive && (activeClassName || "text-primary italic scale-105"),
//             isPending && (pendingClassName || "opacity-50"),
//           )
//         }
//         {...props}
//       />
//     );
//   },
// );

// NavLink.displayName = "NavLink";

// export { NavLink };

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// --- STRICT INTERFACES ---
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

/**
 * Custom NavLink wrapper for 2026 Imprinto Design System.
 * Standardizes active states across the Registry.
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    { className, activeClassName, pendingClassName, to, ...props },
    ref,
  ): JSX.Element => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            "transition-all duration-300 inline-block", // Base industrial transition
            className,
            // DEFAULT ACTIVE PROTOCOL: Primary Color + Italic + Slight Scale
            isActive && cn("text-primary italic scale-105", activeClassName),
            // PENDING STATE: Reduced opacity for async loads
            isPending && cn("opacity-50 grayscale", pendingClassName),
          )
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };