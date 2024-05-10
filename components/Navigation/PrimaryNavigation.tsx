"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo/AKQALogo";
import NavigationItem from "./NavigationItem";
import Copyright from "../Copyright";
import Link from "next/link";
import AKQALogo from "@/components/Logo/AKQALogo";

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button aria-expanded={isOpened} onClick={onClick}>
      <div className="grid justify-items-center gap-1">
        <span
          className={`h-[1px] w-4 bg-white transition duration-200 ease-in ${
            isOpened ? "translate-y-[5px] rotate-45 delay-200" : ""
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition duration-200 ease-in ${
            isOpened ? "scale-0 transition" : "delay-200"
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition duration-200 ease-in ${
            isOpened ? "-translate-y-[5px] -rotate-45 delay-200" : ""
          }`}
        />
      </div>
    </button>
  );
}

export default function PrimaryNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.background = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <nav className="z-header min-h-mobileNavigation fixed top-0 w-full border-b-base border-b-darkGray bg-black bg-opacity-base backdrop-blur-base lg:h-screen lg:border-r-base lg:border-r-darkGray lg:px-6 lg:py-7">
      <div className={"flex place-items-center justify-between p-5"}>
        <Link href="/protected" aria-label="Home" className="w-12">
          <AKQALogo />
        </Link>
        <Hamburger
          isOpened={isOpened}
          openMenu={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] delay-200 duration-500 ease-in-out ${isOpened ? "h-full grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`flex flex-col gap-10 px-5  ${isOpened ? "max-h-[calc(100vh-var(--mobileNavHeight)-1)] overflow-y-scroll" : "overflow-hidden"}`}
        >
          <ul>
            <Link href={"/protected/ComponentsPage"}>Components Page</Link>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
          </ul>
          {children}
          <Copyright />
        </div>
      </div>
    </nav>
  );
}
