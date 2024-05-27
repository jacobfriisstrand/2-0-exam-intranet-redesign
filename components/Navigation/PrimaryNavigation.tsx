"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AKQALogo from "@/components/Logo/AKQALogo";
import AnchorLogo from "../Logo/AnchorLogo";
import Copyright from "@/components/Copyright";
import { usePathname } from "next/navigation";
import Hamburger from "./Hamburger";

interface PrimaryNavigationProps {
  children: React.ReactNode;
}

export default function PrimaryNavigation({
  children,
}: PrimaryNavigationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      document.body.classList.add("body-overlay-active");
    } else {
      document.body.classList.remove("body-overlay-active");
    }

    return () => {
      document.body.classList.remove("body-overlay-active");
    };
  }, [isOpened]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1440px)");

    if (!mediaQuery.matches) {
      setIsOpened(false);
    }

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsOpened(true);
      } else {
        setIsOpened(false);
      }
    };

    if (mediaQuery.matches) {
      setIsOpened(true);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-navigation min-h-[var(--mobileNavHeight)] w-full border-b-base border-b-darkGray bg-black bg-opacity-base backdrop-blur-base lg:h-screen lg:w-desktopSidebarWidth lg:border-b-none lg:border-r-base lg:border-r-darkGray lg:px-6 lg:py-7"
    >
      <div
        className={
          "flex min-h-[var(--mobileNavHeight)] place-items-center justify-between p-5 lg:p-0"
        }
      >
        <Link
          href="/protected"
          aria-label="Home"
          className="flex place-items-center gap-2"
        >
          <AKQALogo className="w-12 lg:w-20" />
          <AnchorLogo className="w-7 lg:w-10" />
        </Link>
        <Hamburger
          isOpened={isOpened}
          openMenu={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={`grid h-full transition-[grid-template-rows] duration-500 ease-in-out lg:grid-rows-[1fr] lg:transition-none ${
          isOpened ? "h-full grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`flex flex-col justify-between  gap-6 px-5 lg:h-[95%] lg:px-0 ${
            isOpened
              ? "max-h-[calc(100svh-var(--mobileNavHeight))] overflow-y-auto lg:overflow-auto"
              : "overflow-hidden"
          }`}
        >
          {/* because UserInfoBar and NavigationList are server components and need async/await functionality, they need to be passed as children via the protected/layout.tsx to the PrimaryNavigation which is a client component */}
          {children}
          <Copyright />
        </div>
      </div>
    </nav>
  );
}
