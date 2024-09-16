"use client";

import React from "react";
import Logo from "../components/logo";
import { cn } from "../lib/utils";
import { PoppinsFont } from "../lib/utils/fontUtils";
import Card from "../components/ui/card";
import { Button } from "../components/ui/button";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-xl leading-[30px] font-normal text-center">
        {title}
      </h2>
      {children}
    </section>
  );
};

const CardConent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="h-[268px] w-[253px] flex-shrink-0">
      <div className="flex flex-col gap-4">{children}</div>
    </Card>
  );
};

export default function Home() {
  return (
    <main
      className={cn(
        "h-dvh w-full flex flex-col gap-[69px] md:gap-12 bg-background text-foreground px-5 pt-6 md:px-40 md:pt-11",
        PoppinsFont.className
      )}
    >
      <Logo />
      <div className="w-full h-full flex flex-col gap-16">
        <h2 className="text-5xl leading-[72px] font-bold">
          Are you <br /> ready for it?
        </h2>
        <div className="flex flex-row gap-4 overflow-auto">
          <CardConent>
            <h3 className={cn("text-2xl font-medium")}>Learning</h3>
            <p className="text-base text-foreground/80 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              efficitur metus
            </p>
            <Button>Cool button</Button>
          </CardConent>
          <CardConent>
            <h3 className={cn("text-2xl font-medium")}>Learning</h3>
            <p className="text-base text-foreground/80 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              efficitur metus
            </p>
            <Button variant="outline">Sign Up</Button>
          </CardConent>
          <CardConent>
            <h3 className={cn("text-2xl font-medium")}>Excellence</h3>
            <p className="text-base text-foreground/80 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              efficitur metus
            </p>
          </CardConent>
        </div>
      </div>
    </main>
  );
}
