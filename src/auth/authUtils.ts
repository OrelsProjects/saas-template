import { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import prisma from "@/app/api/_db/db";
import { UserMetaData } from "@prisma/client";

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

  const userFromDB = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      meta: true,
    },
  });

  const userMeta: Partial<UserMetaData> = {
    ...userFromDB?.meta,
    paidStatus: userFromDB?.meta?.paidStatus || "free",
  };

  return {
    user: { ...session, userId, meta: userMeta },
  };
}

export async function signIn({
  account,
  profile,
  user,
}: {
  account: Account;
  profile: Profile;
  user: User;
}) {
  const userMetaData = await prisma.userMetaData.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!userMetaData) {
    await prisma.userMetaData.create({
      data: {
        userId: user.id,
        paidStatus: "free",
      },
    });
  }

  return session;
}
