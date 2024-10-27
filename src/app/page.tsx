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
import Link from "next/link";
import { motion } from "framer-motion";

const animationProps = {
  initial: { opacity: 0, scale: 1, y: 20 },
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 0.4 },
  variants: {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: 0 },
  },
};

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
      <h2 className="text-xl md:text-2xl leading-[30px] md:leading-9 font-light text-start md:text-center text-foreground/60">
        {title}
      </h2>
      {children}
    </section>
  );
};

const CardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="h-[268px] w-[253px] md:w-[386px] md:h-[327px] flex-shrink-0">
      <div className="h-full flex flex-col gap-4">{children}</div>
    </Card>
  );
};

const Cards = () => (
  <div className="w-full h-fit flex flex-row gap-4 md:grid md:grid-cols-3 md:h-[327px] overflow-auto flex-shrink-0">
    <CardContent>
      <h3 className={cn("text-2xl font-medium")}>Learning</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
      <Button className="mt-auto">Cool button</Button>
    </CardContent>
    <CardContent>
      <h3 className={cn("text-2xl font-medium")}>Learning</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
      <Button variant="outline" className="mt-auto">
        Sign Up
      </Button>
    </CardContent>
    <CardContent>
      <h3 className={cn("text-2xl font-medium")}>Excellence</h3>
      <p className="text-base text-foreground/80 font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        metus
      </p>
    </CardContent>
  </div>
);

const NumbersLine = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "h-[1px] bg-gradient-primary  rotate-180 md:rotate-90 w-44 md:w-24",
      className
    )}
  />
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
    <div className="flex flex-row md:flex-col gap-2.5 md:gap-1 items-center md:items-start">
      <h3 className="text-center text-[32px] leading-[48px] md:text-5xl md:leading-[84px] font-semibold">
        {title}
      </h3>
      <p
        className="font-light"
        dangerouslySetInnerHTML={{ __html: explainingText }}
      />
    </div>
    <NumbersLine
      className={cn("h-[1px] bg-gradient-primary w-44 md:hidden", {
        hidden: !showLine,
      })}
    />
  </div>
);

const UsInNumbers = () => (
  <Section title="Us in numbers">
    <div className="w-full h-fit flex flex-col md:grid md:grid-cols-5 md:items-center md:px-14 gap-6">
      <NumbersComponent
        showLine
        title="95%"
        explainingText="Increase in <br /> whatever it is"
      />
      <NumbersLine />
      <NumbersComponent
        className="ml-[50px] md:ml-0"
        showLine
        title="87K"
        explainingText="Users who <br /> are great"
      />
      <NumbersLine />
      <NumbersComponent
        className="ml-[100px] md:ml-0"
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
    <div className="w-full flex flex-row md:grid md:grid-cols-3 gap-4 overflow-x-auto flex-shrink-0">
      <Card className="w-[253px] h-[228px] md:w-[386px] flex flex-col gap-4 py-8 px-[18px]">
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
      <Card className="w-[253px] h-[228px] md:w-[386px] flex flex-col gap-4 py-8 px-[18px]">
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
      <Card className="w-[253px] h-[228px] md:w-[386px] flex flex-col gap-4 py-8 px-[18px]">
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
    <Button className="py-4 px-14" asChild>
      <Link href="/login">Join us!</Link>
    </Button>
  </div>
);

const CompanyLogo = ({ src, alt }: { src: string; alt: string }) => (
  <Image src={src} alt={alt} width={134} height={32} />
);

const Footer = () => (
  <Section title="You can find us working with">
    <div className="w-full flex flex-col items-center gap-10 md:grid md:grid-cols-5 md:gap-20 overflow-x-auto flex-shrink-0">
      <CompanyLogo src="/edge-kart.png" alt="Edge Kart" />
      <CompanyLogo src="/grasshopper.png" alt="Grasshopper" />
      <CompanyLogo src="/kinetic.png" alt="Kinetic" />
      <CompanyLogo src="/omega-million.png" alt="Omega Million" />
      <CompanyLogo src="/infinity-parker.png" alt="Infinity Parker" />
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
        <motion.div {...animationProps}>
          <h2 className="text-5xl leading-[72px] md:text-7xl md:leading-[96px] font-semibold">
            Are you <br /> ready for it?
          </h2>
        </motion.div>
        <motion.div {...animationProps}>
          <Cards />
        </motion.div>
        <motion.div {...animationProps}>
          <UsInNumbers />
        </motion.div>
        <motion.div {...animationProps}>
          <Reviews />
        </motion.div>
        <motion.div {...animationProps}>
          <BottomCallToAction />
        </motion.div>
        <motion.div {...animationProps}>
          <Footer />
        </motion.div>
      </div>
    </main>
  );
}
