"use client";

import { PrismaClient } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  const { data } = useSession();

  const login = async () => {
    await signIn("google");
  };

  return (
    <div>
      <button onClick={login} className="bg-purple-400 p-4">
        Login
      </button>
      <span>{JSON.stringify(data?.user) || "unauthenticated"}</span>
    </div>
  );
}
