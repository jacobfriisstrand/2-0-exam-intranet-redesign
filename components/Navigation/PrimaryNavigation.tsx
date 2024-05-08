"use client";

import Logo from "@/components/Logo";
import NavigationItem from "./NavigationItem";
import { useEffect, useState } from "react";
import AuthButton from "@/components/AuthButton";

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button aria-expanded={isOpened} onClick={onClick}>
      <div className="grid justify-items-center gap-1">
        <span
          className={`h-[2px] w-6 bg-white transition ease-in duration-200 ${
            isOpened ? "rotate-45 delay-200 translate-y-[6px]" : ""
          }`}
        />
        <span
          className={`h-[2px] w-6 bg-white transition ease-in duration-200 ${
            isOpened ? "scale-0 transition" : "delay-200"
          }`}
        />
        <span
          className={`h-[2px] w-6 bg-white transition ease-in duration-200 ${
            isOpened ? "-rotate-45 delay-200 -translate-y-[6px]" : ""
          }`}
        />
      </div>
    </button>
  );
}

export default function PrimaryNavigation() {
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
        <Logo />
        <Hamburger
          isOpened={isOpened}
          openMenu={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-500 delay-200 ease-in-out ${isOpened ? "grid-rows-[1fr] " : "grid-rows-[0fr]"}`}
      >
        <div
          className={`px-5 ${isOpened ? "overflow-y-scroll max-h-screen" : "overflow-hidden"}`}
        >
          <ul>
            <NavigationItem>
              This is a navigation item without a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item with a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item without a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item with a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item without a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item with a dropdown
            </NavigationItem>
            <NavigationItem>
              This is a navigation item without a dropdown
            </NavigationItem>
          </ul>
          <div>{/* <AuthButton /> */}</div>
        </div>
      </div>
    </nav>
  );
}
