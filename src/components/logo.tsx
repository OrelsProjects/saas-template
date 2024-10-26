import Image from "next/image";
import React from "react";
import { cn } from "../lib/utils";
import { PoppinsFont } from "../lib/utils/fontUtils";

export interface LogoProps {
  showText?: boolean;
  imageClassName?: string;
}

export default function Logo({ showText = true, imageClassName }: LogoProps) {
  return (
    <div className="flex flex-row items-center gap-1">
      <Image
        src="/logo.png"
        alt="saas-template-logo"
        fill
        className={cn("!relative !w-6 !h-6 md:!w-10 md:!h-10", imageClassName)}
      />
      {showText && (
        <p
          className={cn(
            "text-gradient-primary text-[32px] leading-[48px] text-center font-[900]",
            PoppinsFont.className
          )}
        >
          Lobit
        </p>
      )}
    </div>
  );
}
