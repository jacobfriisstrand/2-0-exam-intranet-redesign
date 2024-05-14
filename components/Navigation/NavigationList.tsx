import { getNavigation } from "@/sanity/sanity-utils";
import NavigationItem from "./NavigationItem";
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
    slug: {
      current: string;
    };
  };
  children?: NavItem[];
}

export default async function NavigationList() {
  const navigationData = await getNavigation();

  return (
    <ul
      id="primary-navigation"
      className="flex flex-col gap-4 xl:mt-7 xl:gap-7"
    >
      {navigationData?.map((navItem: NavItem) => (
        <NavigationItem key={navItem._key} navItem={navItem} />
      ))}
      <Link href="/protected/componentspage">Components Page</Link>
    </ul>
  );
}
