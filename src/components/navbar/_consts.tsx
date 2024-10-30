import { ElementType } from "react";
import { GoHomeFill as HomeActive, GoHome as Home } from "react-icons/go";
import {
  IoStatsChart as StatisticsActive,
  IoStatsChartOutline as Statistics,
} from "react-icons/io5";
import { MdOutlinePayment as Pricing } from "react-icons/md";


import { cn } from "../../lib/utils";

export interface NavigationBarItem {
  icon: ElementType;
  iconActive: ElementType;
  label: "Home" | "Pricing" | "Statistics" | "Profile";
  href: string;
  header?: string;
}

const className = "w-8 h-8 md:w-6 md:h-6 fill-foreground";
const classNameActive = "fill-primary";

export const BottomBarItems: NavigationBarItem[] = [
  {
    icon: () => <Home className={className} />,
    iconActive: () => <HomeActive className={cn(className, classNameActive)} />,
    label: "Home",
    href: "/home",
    header: "Home",
  },
  {
    icon: () => <Statistics className={className} />,
    iconActive: () => (
      <StatisticsActive className={cn(className, classNameActive)} />
    ),
    label: "Statistics",
    href: "/statistics",
    header: "Statistics",
  },
  {
    icon: () => <Pricing className={className} />,
    iconActive: () => (
      <Pricing className={cn(className, classNameActive)} />
    ),
    label: "Pricing",
    href: "/pricing",
    header: "Pricing",
  },
];
