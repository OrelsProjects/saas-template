import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility function for conditional classes
import { IoIosCheckmarkCircle as CheckMark } from "react-icons/io";

export type CardType = "primary" | "regular";

interface PricingFeature {
  feature: string;
}

export interface PricingCardProps {
  type: CardType;
  title: string;
  price: string;
  features: PricingFeature[];
}

const PricingCard = ({ type, title, price, features }: PricingCardProps) => {
  const isPrimary = type === "primary";

  return (
    <div
      className={cn(
        "relative w-full flex flex-col gap-[72px] p-6 rounded-2xl border border-foreground/10 overflow-hidden",
        {
          "w-11/12": !isPrimary,
        }
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40",
          {
            "bg-gradient-to-r from-foreground/[0.24] via-foreground/[0.12] to-foreground/[0.12]":
              isPrimary,
            "bg-gradient-to-r from-foreground/[0.08] via-foreground/[0.04] to-foreground/[0.04]":
              !isPrimary,
          }
        )}
      />
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex flex-col gap-2">
          {isPrimary && (
            <div className="flex justify-center">
              <Image src="/crown.png" alt="Crown Icon" width={30} height={30} />
            </div>
          )}
          <h2 className="text-base text-center">{title}</h2>
        </div>
        <p className="text-4xl text-center">${price}</p>
        <ul className="flex flex-col gap-2.5 text-foreground text-lg">
          {features.map((feature, index) => (
            <li key={index} className="flex flex-row items-center gap-4">
              <CheckMark className="fill-foreground w-6 h-6" />
              <span>{feature.feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isPrimary ? "default" : "outline"}
        className="w-full z-10"
      >
        Start Trial
      </Button>
    </div>
  );
};

export default PricingCard;
