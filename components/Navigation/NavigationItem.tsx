"use client";

import { useEffect, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  _key: string;
  title: string;
  path?: string;
  svgIcon: string;
  target?: {
    title: string;
    slug: string;
  };
  children?: NavItem[];
}

interface NavigationItemProps {
  navItem: NavItem;
}

const NavigationItem = React.memo(({ navItem }: NavigationItemProps) => {
  const pathname = usePathname();
  const variants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.3, ease: "easeInOut" },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.3, delay: 0.1, ease: "easeInOut" },
      },
    },
  };

  const [navItemIsOpen, setNavItemIsOpen] = useState<boolean>(false);
  const [subNavStates, setSubNavStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleSubNavItem = (key: string) => {
    setSubNavStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    // Check if the current page is within this nav item's children or any of their sub-children
    const isCurrentMenuActive =
      navItem.children?.some(
        (child) =>
          `${process.env.BASE_URL}/${child.target?.slug}` === pathname ||
          child.children?.some(
            (subChild) =>
              `${process.env.BASE_URL}/${subChild.target?.slug}` === pathname,
          ),
      ) || false; // Provide a default value in case it's undefined

    // If it is, then open this menu
    setNavItemIsOpen(isCurrentMenuActive);

    // Do the same for submenus
    navItem.children?.forEach((child) => {
      const isCurrentSubMenuActive =
        child.children?.some(
          (subChild) =>
            `${process.env.BASE_URL}/${subChild.target?.slug}` === pathname,
        ) || false; // Provide a default value in case it's undefined

      setSubNavStates((prev) => ({
        ...prev,
        [child._key]: isCurrentSubMenuActive,
      }));
    });
  }, [pathname]); // Re-run this effect whenever pathname changes

  return (
    <li className=" w-full text-baseLarge">
      {navItem.children ? (
        <>
          <Button
            className={`group flex place-items-center gap-2 transition-colors hover:text-accent `}
            variant={"unstyled"}
            onClick={() => setNavItemIsOpen(!navItemIsOpen)}
          >
            <div
              className="flex size-[1em] items-center justify-center"
              dangerouslySetInnerHTML={{ __html: navItem.svgIcon }}
            />
            <span>{navItem.title}</span>
            <MdOutlineExpandMore
              className={`transition-transform group-hover:text-accent  ${navItemIsOpen ? "rotate-180" : "text-white"}`}
            />
          </Button>
          <AnimatePresence>
            {navItemIsOpen && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
              >
                <ul className=" mt-2 space-y-3 rounded-base bg-darkGray px-6 py-4">
                  {navItem.children.map((child) =>
                    child.children ? (
                      <li key={child._key}>
                        <Button
                          className={`group flex place-items-center gap-2 overflow-hidden transition-colors hover:text-lightGray `}
                          variant={"unstyled"}
                          onClick={() => toggleSubNavItem(child._key)}
                        >
                          <span>{child.title}</span>
                          <MdOutlineExpandMore
                            className={`transition-transform group-hover:text-lightGray ${subNavStates[child._key] ? "rotate-180" : "text-white"}`}
                          />
                        </Button>
                        <AnimatePresence>
                          {subNavStates[child._key] && (
                            <motion.div
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={variants}
                            >
                              <ul className="mt-2 w-full space-y-2 rounded-base bg-lightGray p-4 text-darkGray">
                                {child.children.map((subChild) => (
                                  <li key={subChild._key}>
                                    <Link
                                      className={`transition-colors hover:text-accent ${pathname === `${process.env.BASE_URL}/${subChild.target?.slug}` ? "text-accent" : ""} `}
                                      href={`${process.env.BASE_URL}/${subChild.target?.slug}`}
                                    >
                                      {subChild.target?.title || subChild.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={child._key}>
                        <Link
                          className={`transition-colors hover:text-accent ${pathname === `${process.env.BASE_URL}/${child.target?.slug}` ? "text-accent" : ""} `}
                          href={`${process.env.BASE_URL}/${child.target?.slug}`}
                        >
                          {child.target?.title || child.title}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          className={`flex items-center gap-2 transition-colors hover:text-accent ${pathname === `${process.env.BASE_URL}/${navItem.target?.slug}` ? "text-accent" : ""} `}
          href={`${process.env.BASE_URL}/${navItem.target?.slug}`}
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

export default NavigationItem;
