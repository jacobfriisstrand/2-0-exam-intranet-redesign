"use client";

import { useState, useEffect, useRef } from "react";
import { MdNewspaper, MdOutlineExpandMore } from "react-icons/md";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import AKQALogo from "@/components/Logo/AKQALogo";

import navigationData from "./navigationData.json";
import { Button } from "../ui/button";
import AnchorLogo from "../Logo/AnchorLogo";

interface NavigationItemProps {
  navItem: {
    title: string;
    icon?: string;
    path?: string;
    childrens?: {
      title?: string;
      path?: string;
    }[];
  };
}

function NavigationItem({ navItem }: NavigationItemProps) {
  return (
    <li className="text-baseLarge">
      {navItem.childrens ? (
        <>
          <Button className="space-x-4" variant={"unstyled"}>
            <MdNewspaper />
            <span>{navItem.title}</span>
            {navItem.childrens && <MdOutlineExpandMore />}
          </Button>
        </>
      ) : (
        <>
          <Link
            className="flex place-items-center space-x-4"
            href={navItem.path || ""}
          >
            <MdNewspaper />
            <span>{navItem.title}</span>
          </Link>
        </>
      )}
    </li>
  );
}

function NavigationList() {
  return (
    <ul id="primary-navigation" className="space-y-4">
      <Link href="/protected/ComponentsPage">Components Page</Link>
      {navigationData.map((navItem, index) => {
        return (
          <>
            <NavigationItem key={index} navItem={navItem} />
          </>
        );
      })}
    </ul>
  );
}

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button
      aria-expanded={isOpened}
      aria-controls="#primary-navigation"
      aria-haspopup="true"
      className="size-6"
      onClick={onClick}
    >
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
  const navRef = useRef<HTMLDivElement>(null);

  // function to close menu when a link is clicked
  function handleMenuClick(event: {
    nativeEvent: { composedPath: () => any };
  }) {
    const path = event.nativeEvent.composedPath();
    for (const element of path) {
      if (element.tagName === "A") {
        setIsOpened(false);
        break;
      }
    }
  }

  // function to close menu when clicking outside of menu
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

  // Toggle the `body-overlay-active` class when menu is open
  useEffect(() => {
    if (isOpened) {
      document.body.classList.add("body-overlay-active");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("body-overlay-active");
      document.body.style.overflow = "";
    }

    // Cleanup function to remove styles on component unmount
    return () => {
      document.body.classList.remove("body-overlay-active");
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <nav
      ref={navRef}
      onClick={handleMenuClick}
      className="min-h-mobileNavigation fixed top-0 z-navigation w-full border-b-base border-b-darkGray bg-black bg-opacity-base backdrop-blur-base lg:h-screen lg:border-r-base lg:border-r-darkGray lg:px-6 lg:py-7"
    >
      <div className={"flex place-items-center justify-between p-5"}>
        <Link
          href="/protected"
          aria-label="Home"
          className="flex place-items-center gap-2"
        >
          <AKQALogo className="w-12" />
          <AnchorLogo className="w-6" />
        </Link>
        <Hamburger
          isOpened={isOpened}
          openMenu={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpened ? "h-full grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`flex flex-col gap-10 px-5   ${isOpened ? "max-h-[calc(100vh-var(--mobileNavHeight))] overflow-y-scroll" : "overflow-hidden"}`}
        >
          <NavigationList />
          {/* Children is SearchBar component. Since it is a server component, it has to be injected as a children prop to the Navigation, which is a client component */}
          {children}
          <Copyright />
        </div>
      </div>
    </nav>
  );
}
