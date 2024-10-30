import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "@/app/api/_db/db";
import { UserMetaData } from "@prisma/client";

export async function session({
  session,
  user,
}: {
  session: Session;
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

  const newSession: Session = {
    ...session,
    user: {
      ...session.user,
      meta: userMeta,
    },
  };

  return newSession;
}

export async function signIn(session: any) {
  const { user } = session;
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
