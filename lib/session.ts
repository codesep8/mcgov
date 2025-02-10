import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  id: string;
  username: string;
  point: number;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: "asdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjask",
  cookieName: "session",
  cookieOptions: {
    secure: false,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
    session.isAdmin = false;
    session.username = "";
    session.id = "";
    session.point = 0;
  }
  return session;
}