"use client";
import { useState, useEffect, useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import AKQALogo from "@/components/Logo/AKQALogo";
import { getNavigation } from "@/sanity/sanity-utils";

import { Button } from "../ui/button";
import AnchorLogo from "../Logo/AnchorLogo";
import React from "react";

// Interface for NavigationItem props
interface NavigationItemProps {
  navItem: NavItem;
}

// Interface for the structure of navigation items
interface NavItem {
  _key: string;
  title: string;
  path?: string;
  svgIcon: string;
  target?: {
    title: string;
    slug: {
      current: string;
    };
  };
  children?: NavItem[];
}

const NavigationItem = React.memo(({ navItem }: NavigationItemProps) => {
  const [navItemIsOpen, setNavItemIsOpen] = useState(false);
  const [subNavItemIsOpen, setSubNavItemIsOpen] = useState(false);
  return (
    <li className="max-w-fit text-baseLarge">
      {navItem.children ? (
        <>
          <Button
            className="grid grid-cols-[auto_auto_auto] place-items-center gap-2"
            variant={"unstyled"}
            onClick={() => {
              setNavItemIsOpen(!navItemIsOpen);
              console.log(navItemIsOpen);
            }}
          >
            <div
              className="flex size-[1em] items-center justify-center"
              dangerouslySetInnerHTML={{ __html: navItem.svgIcon }}
            />
            <span>{navItem.title}</span>
            {navItem.children && <MdOutlineExpandMore />}
          </Button>

          <ul className="pl-10">
            {navItem.children?.map((child) =>
              child.children ? (
                <li
                  key={child._key}
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    navItemIsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <Button
                    className="grid grid-cols-[auto_auto_auto] place-items-center gap-2 overflow-hidden"
                    variant={"unstyled"}
                    onClick={() => {
                      setSubNavItemIsOpen(!subNavItemIsOpen);
                      console.log(navItemIsOpen);
                    }}
                  >
                    <span>{child.title}</span>
                    {navItem.children && <MdOutlineExpandMore />}
                  </Button>

                  <ul
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                      subNavItemIsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    {child.children?.map((subChild) => (
                      <li
                        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                          subNavItemIsOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                        key={subChild._key}
                      >
                        <Link
                          className="overflow-hidden"
                          href={`/${subChild.target?.slug.current}`}
                        >
                          {subChild.target?.title || subChild.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    navItemIsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                  key={child._key}
                >
                  <Link
                    className="overflow-hidden"
                    href={`/${child.target?.slug.current}`}
                  >
                    {child.target?.title || child.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </>
      ) : (
        <Link
          className="grid grid-cols-[auto_auto] items-center gap-2"
          href={`/${navItem.target?.slug.current}`}
        >
          <div
            className="flex size-[1em] items-center justify-center"
            dangerouslySetInnerHTML={{ __html: navItem.svgIcon }}
          />
          <span>{navItem.title}</span>
        </Link>
      )}
    </li>
  );
});

const NavigationList = React.memo(() => {
  const [navigationData, setNavigationData] = useState<NavItem[] | null>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const data = await getNavigation();
        setNavigationData(data);
      } catch (error) {
        console.error("Error fetching navigation:", error);
      }
    }

    fetchNavigation();
  }, []);
  console.log("navigationData", navigationData);

  return (
    <ul id="primary-navigation" className="space-y-4">
      <Link href="/protected/componentspage">Components Page</Link>
      {navigationData?.map((navItem: NavItem) => (
        <NavigationItem key={navItem._key} navItem={navItem} />
      ))}
    </ul>
  );
});

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button
      aria-expanded={isOpened}
      aria-controls="primary-navigation"
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

interface PrimaryNavigationProps {
  children: React.ReactNode;
}

export default function PrimaryNavigation({
  children,
}: PrimaryNavigationProps) {
  const [isOpened, setIsOpened] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Function to close menu when clicking outside of menu
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
      className="fixed top-0 z-navigation min-h-[var(--mobileNavHeight)] w-full border-b-base border-b-darkGray bg-black bg-opacity-base backdrop-blur-base lg:h-screen lg:border-r-base lg:border-r-darkGray lg:px-6 lg:py-7"
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
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpened ? "h-full grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`flex flex-col gap-10 px-5 ${
            isOpened
              ? "max-h-[calc(100vh-var(--mobileNavHeight))] overflow-y-scroll"
              : "overflow-hidden"
          }`}
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
