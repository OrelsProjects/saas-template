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
  const userId = user.id;
  if (!userId) {
    throw new Error("No user ID found in JWT");
  }
  return session;
}
