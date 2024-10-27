"use client";

import React from "react";
import PricingCard, { CardType } from "./pricingCard";
import Logo from "../../components/logo";

const pricingData = [
  {
    type: "regular" as CardType,
    title: "Single",
    price: "9",
    features: [
      { feature: "Basic features" },
      { feature: "100MB cloud storage" },
      { feature: "Monthly data reports" },
      { feature: "24/7 support" },
    ],
  },
  {
    type: "primary" as CardType,
    title: "Advanced Single",
    price: "29",
    features: [
      { feature: "Advanced features" },
      { feature: "All Basic Single features" },
      { feature: "1TB additional storage" },
      { feature: "Data Analysis service" },
    ],
  },
  {
    type: "regular" as CardType,
    title: "Team",
    price: "69",
    features: [
      { feature: "Special team features" },
      { feature: "All Advanced Single features" },
      { feature: "10TB additional storage" },
      { feature: "Data Analysis service" },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="w-full h-fit flex flex-col items-center pt-8 overflow-clip pb-10">
      <div className="h-fit w-fit flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="w-full flex justify-start">
          <Logo showText={false} size="large" className="md:hidden" />
          <Logo showText size="large" className="hidden md:flex" />
        </div>
        <h1 className="text-4xl font-bold text-foreground md:mb-12">Our deals</h1>

        {/* Plans */}
        <div className="flex flex-col items-center md:flex-row gap-4 md:h-[550px]">
          {pricingData.map((card, index) => (
            <PricingCard
              key={index}
              type={card.type}
              title={card.title}
              price={card.price}
              features={card.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
