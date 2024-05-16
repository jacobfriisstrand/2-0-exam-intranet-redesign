"use client";

import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import React from "react";

// Interface for NavigationItem props
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
  const variants = {
    initial: {
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
      marginTop: 8,
      marginBottom: 8,
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.3, ease: "easeInOut" },
        marginTop: { duration: 0.3, ease: "easeInOut" },
        marginBottom: { duration: 0.3, ease: "easeInOut" },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.3, delay: 0.1, ease: "easeInOut" },
        marginTop: { duration: 0.3, delay: 0.1, ease: "easeInOut" },
        marginBottom: { duration: 0.3, delay: 0.1, ease: "easeInOut" },
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

  const basePath = "/protected/";

  return (
    <li className="max-w-fit text-baseLarge">
      {navItem.children ? (
        <>
          <Button
            className={`grid grid-cols-[auto_auto_auto] place-items-center gap-2 transition-colors hover:text-accent ${navItemIsOpen ? "text-accent" : ""}`}
            variant={"unstyled"}
            onClick={() => setNavItemIsOpen(!navItemIsOpen)}
          >
            <div
              className="flex size-[1em] items-center justify-center"
              dangerouslySetInnerHTML={{ __html: navItem.svgIcon }}
            />
            <span>{navItem.title}</span>
            <MdOutlineExpandMore
              className={`transition ${navItemIsOpen ? "rotate-180 text-accent" : "text-white"}`}
            />
          </Button>
          <AnimatePresence>
            {navItemIsOpen && (
              <motion.ul
                className="pl-8"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
              >
                {navItem.children.map((child) =>
                  child.children ? (
                    <li key={child._key}>
                      <Button
                        className={`grid grid-cols-[auto_auto_auto] place-items-center gap-2 overflow-hidden transition-colors hover:text-accent ${subNavStates[child._key] ? "text-accent" : ""}`}
                        variant={"unstyled"}
                        onClick={() => toggleSubNavItem(child._key)}
                      >
                        <span>{child.title}</span>
                        <MdOutlineExpandMore
                          className={`transition ${subNavStates[child._key] ? "rotate-180 text-accent" : "text-white"}`}
                        />
                      </Button>
                      <AnimatePresence>
                        {subNavStates[child._key] && (
                          <motion.ul
                            className="pl-3"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={variants}
                          >
                            {child.children.map((subChild) => (
                              <li key={subChild._key}>
                                <Link
                                  className="transition-colors hover:text-accent"
                                  href={`${basePath}${subChild.target?.slug}`}
                                >
                                  {subChild.target?.title || subChild.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={child._key}>
                      <Link
                        className="transition-colors hover:text-accent"
                        href={`${basePath}${child.target?.slug}`}
                      >
                        {child.target?.title || child.title}
                      </Link>
                    </li>
                  ),
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          className="grid grid-cols-[auto_auto] items-center gap-2 transition-colors hover:text-accent "
          href={`${basePath}${navItem.target?.slug}`}
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
