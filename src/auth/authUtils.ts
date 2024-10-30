import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export async function session({
  session,
  token,
  user,
}: {
  session: Session;
  token: JWT;
  user: AdapterUser;
}) {
  console.log("Session function");
  const userId = user.id || token?.sub;
  console.log("userId", userId);
  console.log("session", session);
  if (!userId) {
    return session;
  }
  return session;
}
