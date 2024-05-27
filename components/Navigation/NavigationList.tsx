import { getNavigation } from "@/sanity/sanity-utils";
import NavigationItem from "./NavigationItem";
import React from "react";

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

export default async function NavigationList() {
  const navigationData = await getNavigation();

  return (
    <ul
      id="primary-navigation"
      className="flex flex-col gap-4 lg:mt-7 lg:gap-7"
    >
      {navigationData?.map((navItem: NavItem) => (
        <NavigationItem key={navItem._key} navItem={navItem} />
      ))}
    </ul>
  );
}
