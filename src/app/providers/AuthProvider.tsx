"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { useSession } from "next-auth/react";
import { setUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, status } = useSession();

  useEffect(() => {
    switch (status) {
      case "authenticated":
        if (data.user) {
          dispatch(setUser({ user: data.user, state: "authenticated" }));
        } else {
          dispatch(setUser());
        }
        break;
      case "unauthenticated":
        dispatch(setUser());
        router.push("/");
        break;
      default:
        break;
    }
  }, [status]);

  if (status !== "authenticated") {
    return <div>Loading...</div>;
  }

  return children;
}
