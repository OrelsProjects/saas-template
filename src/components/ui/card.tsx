import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col py-[18px] px-8 rounded-2xl bg-gradient-to-l from-foreground/[0.04] to-foreground/[0.08]",
        className
      )}
    >
      {children}
    </div>
  );
}
