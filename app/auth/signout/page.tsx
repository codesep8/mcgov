import { SignOutForm } from "@/components/form/signout"
import { MetaData } from "@/components/metaData";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignOutPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return redirect("/auth/signin");
  }
  return (
    <>
      <MetaData title="로그아웃" />
      <SignOutForm />
    </>
  )
}