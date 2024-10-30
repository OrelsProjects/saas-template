import { signIn, signOut } from "next-auth/react";

export function useAuth() {
  const signInWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/home" });
    } catch (error: any) {
      await signOut();
      throw error;
    }
  };
  return { signInWithGoogle };
}
