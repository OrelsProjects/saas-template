"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PoppinsFont } from "@/lib/utils/fontUtils";

export default function UnautenticatedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full h-full px-5", PoppinsFont.className)}>
      {children}
    </div>
  );
}