"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  showLogo?: boolean;
  variant?: "default" | "dark";
}

export default function Navigation({ showLogo = true, variant = "default" }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contacts", label: "Contacts" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-20">
      <div className="bg-transparent">
        <div className="flex justify-between items-center px-4 md:px-8 py-4">
          {/* Logo Section */}
          {showLogo && (
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/assets/LOGO-TRANSPARENT.png"
                  alt="MEDSTONE Logo"
                  width={280}
                  height={70}
                  quality={100}
                  priority
                  className="h-auto w-auto max-w-[200px] md:max-w-[280px]"
                />
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className={`flex gap-6 md:gap-12 ${!showLogo ? 'ml-auto' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  font-raleway font-medium text-base md:text-lg transition-all duration-300 relative
                  ${variant === "dark"
                    ? "text-gold hover:text-goldLight"
                    : "text-gold hover:text-goldLight"
                  }
                  ${isActive(item.href) ? "text-goldLight" : ""}
                  hover:scale-105
                `}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-goldLight"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
