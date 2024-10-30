"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../components/logo";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../lib/hooks/useAuth";

const LoginWith = ({ image, text }: { image: string; text: string }) => (
  <div className="w-full h-full flex justify-center items-center gap-1">
    <Image
      src={image}
      fill
      alt="login-logo"
      className="!relative !h-[18px] !w-[18px] md:!h-7 md:!w-7"
    />
    <p className="text-base text-foreground font-light md:text-lg">{text}</p>
  </div>
);

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-6 md:gap-[88px] pt-20">
      <Logo showText={false} imageClassName="!w-[34px] !h-[34px] md:hidden" />
      <Logo showText imageClassName="!w-[34px] !h-[34px]" />
      <div className="flex flex-col gap-16">
        <h1 className="text-[40px] leading-[60px] md:text-[56px] md:leading-[84px] font-bold text-center text-foreground">
          Log in or Sign up
        </h1>
        <div className="flex flex-col gap-4 md:px-7">
          <Button onClick={() => signInWithGoogle()}>
            <LoginWith image="/google.png" text="With Google" />
          </Button>
          <Button>
            <LoginWith image="/apple.png" text="With Apple" />
          </Button>
        </div>
      </div>
    </div>
  );
}
