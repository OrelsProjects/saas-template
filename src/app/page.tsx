"use client";

import React from "react";
import Image from "next/image";
import Logo from "../components/logo";
import { cn } from "../lib/utils";
import { PoppinsFont } from "../lib/utils/fontUtils";
import Card from "../components/ui/card";
import { Button } from "../components/ui/button";
import { IoMdStar } from "react-icons/io";
import { formatDate } from "../lib/utils/dateUtils";

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
      <h2 className="text-xl leading-[30px] font-light text-start text-foreground/60">
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

const Star = () => (
  <div className="w-7 h-7 bg-rating-background flex justify-center items-center p-1">
    <IoMdStar className="w-full h-full" />
  </div>
);

const Reviews = () => (
  <Section title="People say that">
    <div className="w-full flex flex-row gap-4 overflow-x-auto flex-shrink-0">
      <Card className="w-[253px] h-[228px] flex flex-col gap-4 py-8 px-[18px]">
        <div className="flex flex-row gap-2">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <h3 className="text-xl leading-[25px] font-semibold line-clamp-1">
          Matty
        </h3>
        <p className="line-clamp-2">
          For quite a few years Service has always been working as expected!
        </p>
        <p className="text-sm text-foreground/40">{formatDate(new Date())}</p>
      </Card>
      <Card className="w-[253px] h-[228px] flex flex-col gap-4 py-8 px-[18px]">
        <div className="flex flex-row gap-2">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <h3 className="text-xl leading-[25px] font-semibold line-clamp-1">
          Matty
        </h3>
        <p className="line-clamp-2">
          For quite a few years Service has always been working as expected!
        </p>
        <p className="text-sm text-foreground/40">{formatDate(new Date())}</p>
      </Card>
      <Card className="w-[253px] h-[228px] flex flex-col gap-4 py-8 px-[18px]">
        <div className="flex flex-row gap-2">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <h3 className="text-xl leading-[25px] font-semibold line-clamp-1">
          Matty
        </h3>
        <p className="line-clamp-2">
          For quite a few years Service has always been working as expected!
        </p>
        <p className="text-sm text-foreground/40">{formatDate(new Date())}</p>
      </Card>
    </div>
  </Section>
);

const BottomCallToAction = () => (
  <div className="flex flex-col gap-4 justify-center items-center">
    <h3 className="text-4xl font-semibold text-center">
      Think you&apos;ve got what it takes?
    </h3>
    <p className="text-center font-light">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
      metus
    </p>
    <Button className="py-4 px-14">Join us!</Button>
  </div>
);

const CompanyLogo = ({ src, alt }: { src: string; alt: string }) => (
  <Image src={src} alt={alt} width={134} height={32} />
);

const Footer = () => (
  <Section title="You can find us working with">
    <div className="w-full flex flex-col items-center gap-10 md:flex-row md:gap-20 overflow-x-auto flex-shrink-0">
      <CompanyLogo src="/edge-kart.png" alt="Edge Kart" />
      <CompanyLogo src="/grasshopper.png" alt="Grasshopper" />
      <CompanyLogo src="/kinetic.png" alt="Kinetic" />
      <CompanyLogo src="/omega-million.png" alt="Omega Million" />
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
        <Reviews />
        <BottomCallToAction />
        <Footer />
      </div>
    </main>
  );
}
