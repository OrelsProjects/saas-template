"use client";

import React from "react";
import NavigationBar from "../../components/navbar/navbar";

export default function ContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full px-4 pb-[84px] pt-[38px] md:pb-0 md:flex md:flex-row lg:px-[100px] xl:px-[240px]">
      <NavigationBar />
      <div className="w-full h-full pb-4">{children}</div>
    </div>
  );
}
