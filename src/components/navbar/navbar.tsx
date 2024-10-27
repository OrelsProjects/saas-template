"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BottomBarItems, NavigationBarItem } from "./_consts";
import Logo from "../logo";

interface NavigationBar {
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const NavigationBar: React.FC<NavigationBar> = ({ ...props }) => {
  const [items] = useState([...BottomBarItems]);
  const [activeItem, setActiveItem] = useState<NavigationBarItem | undefined>(
    items[0]
  );
  const pathname = usePathname();

  useEffect(() => {
    setActiveItem(items.find((i) => pathname.includes(i.href)));
  }, [items, pathname]);

  const isItemActive = (item: NavigationBarItem) =>
    item.href === activeItem?.href;

  const Item = ({ item, id }: { item: NavigationBarItem; id: string }) => (
    <Link
      href={item.href}
      className={cn(
        "flex-1 flex items-center justify-center md:justify-start md:rounded-lg cursor-pointer"
      )}
      key={item.href}
      data-onboarding-id={id}
    >
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
        {isItemActive(item) ? <item.iconActive /> : <item.icon />}
        <span
          className={cn("hidden md:inline text-xl leading-[30px]", {
            "text-gradient-primary": isItemActive(item),
          })}
        >
          {item.label}
        </span>
      </div>
    </Link>
  );

  const SideNavigationBar = () => (
    <div
      className={cn(
        "hidden md:sticky md:flex flex-col w-60 inset-x-0 bottom-0 left-0 z-40 select-none gap-header-to-content",
        props.className
      )}
      ref={props.ref}
    >
      <Logo size="small" />
      <div className="h-16 w-fit flex flex-col gap-10">
        {items.map((item) => (
          <Item
            item={item}
            key={item.href}
            id={`navigation-bar-item-${item.label}`}
          />
        ))}
      </div>
    </div>
  );

  const BottomNavigationBar = () => (
    <div
      className="fixed py-[18px] bg-foreground/5 md:hidden inset-x-0 bottom-0 z-40 select-none"
      ref={props.ref}
    >
      <div className="py-2 w-full flex flex-row gap-10">
        {items.map((item) => (
          <Item
            item={item}
            key={item.href}
            id={`navigation-bar-item-${item.label}-mobile`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SideNavigationBar />
      <BottomNavigationBar />
    </>
  );
};

export default NavigationBar;
