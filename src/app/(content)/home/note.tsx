import React from "react";
import { cn } from "../../../lib/utils";

export const Note = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "w-full h-full flex justify-center items-center rounded-md bg-note text-background font-medium shadow-md md:shadow-none",
      className
    )}
  >
    {children}
  </div>
);
