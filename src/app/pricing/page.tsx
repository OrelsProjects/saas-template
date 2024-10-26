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
    <div className="flex flex-col items-center my-8 gap-14">
      <div className="w-full flex justify-start">
        <Logo showText={false} imageClassName="!h-8 !w-8" />
      </div>
      <div className="w-full flex flex-col items-center md:flex-row gap-4 pb-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">Our deals</h1>
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
  );
}
