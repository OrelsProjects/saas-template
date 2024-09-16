"use client";

import React from "react";
import Logo from "../components/logo";
import { cn } from "../lib/utils";
import { PoppinsFont } from "../lib/utils/fontUtils";
import Card from "../components/ui/card";
import { Button } from "../components/ui/button";

const Section = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <h2 className="text-xl leading-[30px] font-light text-start">{title}</h2>
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

const Cards = () => (
  <div className="w-full h-fit flex flex-row gap-4 overflow-auto flex-shrink-0">
    <CardConent>
      <h3 className={cn("text-2xl font-medium")}>Learning</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
      <Button>Cool button</Button>
    </CardConent>
    <CardConent>
      <h3 className={cn("text-2xl font-medium")}>Learning</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
      <Button variant="outline">Sign Up</Button>
    </CardConent>
    <CardConent>
      <h3 className={cn("text-2xl font-medium")}>Excellence</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
    </CardConent>
  </div>
);

const NumbersComponent = ({
  className,
  title,
  showLine,
  explainingText,
}: {
  className?: string;
  showLine?: boolean;
  title: string;
  explainingText: string;
}) => (
  <div className={cn("flex flex-col gap-6", className)}>
    <div className="flex flex-row gap-2.5 items-center">
      <h3 className="text-center text-[32px] leading-[48px] font-semibold">
        {title}
      </h3>
      <p
        className="font-light"
        dangerouslySetInnerHTML={{ __html: explainingText }}
      />
    </div>
    <div
      className={cn("h-[1px] bg-gradient-primary rotate-180 w-44 ml-[23px]", {
        hidden: !showLine,
      })}
    />
  </div>
);

const UsInNumbers = () => (
  <Section title="Us in numbers">
    <div className="w-full h-fit flex flex-col gap-6">
      <NumbersComponent
        showLine
        title="95%"
        explainingText="Increase in <br /> whatever it is"
      />
      <NumbersComponent
        className="ml-[50px]"
        showLine
        title="87K"
        explainingText="Users who <br /> are great"
      />
      <NumbersComponent
        className="ml-[100px]"
        title="60M"
        explainingText="Number that <br /> mean a lot"
      />
    </div>
  </Section>
);

export default function Home() {
  return (
    <main
      className={cn(
        "h-dvh w-full flex flex-col md:gap-12 bg-background text-foreground px-5 pt-6 md:px-40 md:pt-11",
        PoppinsFont.className
      )}
    >
      <Logo />
      <div className="w-full h-full flex flex-col gap-16 overflow-auto pb-6 pt-[69px] md:pb-11 md:pt-[49px]">
        <h2 className="text-5xl leading-[72px] font-semibold">
          Are you <br /> ready for it?
        </h2>
        <Cards />
        <UsInNumbers />
      </div>
    </main>
  );
}
