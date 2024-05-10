"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import NavigationItem from "./NavigationItem";
import Copyright from "../Copyright";
import Link from "next/link";

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button aria-expanded={isOpened} onClick={onClick}>
      <div className="grid justify-items-center gap-1">
        <span
          className={`h-[1px] w-4 bg-white transition ease-in duration-200 ${
            isOpened ? "rotate-45 delay-200 translate-y-[5px]" : ""
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition ease-in duration-200 ${
            isOpened ? "scale-0 transition" : "delay-200"
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition ease-in duration-200 ${
            isOpened ? "-rotate-45 delay-200 -translate-y-[5px]" : ""
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
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <nav className="top-0 min-h-mobileNavigation fixed w-full bg-opacity-base backdrop-blur-base z-header border-b-base bg-black border-b-darkGray lg:border-r-base lg:border-r-darkGray lg:py-7 lg:px-6 lg:h-screen">
      <div className={"flex p-5 place-items-center justify-between"}>
        <Link href="/protected" aria-label="Home" className="w-12">
          <Logo />
        </Link>
        <Hamburger
          isOpened={isOpened}
          openMenu={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-500 delay-200 ease-in-out ${isOpened ? "grid-rows-[1fr] " : "grid-rows-[0fr]"}`}
      >
        <div
          className={`px-5 flex flex-col gap-10  ${isOpened ? "overflow-y-scroll max-h-[calc(100vh-var(--mobileNavHeight))]" : "overflow-hidden"}`}
        >
          <ul>
            <Link href={"/protected/ComponentsPage"}>Components Page</Link>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
            <NavigationItem>This is a navigation item</NavigationItem>
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
