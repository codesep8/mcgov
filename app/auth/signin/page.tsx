import { SignInForm } from "@/components/form/signin"
import { MetaData } from "@/components/metaData";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getSession();
  if (session.isLoggedIn) {
    return redirect("/");
  }
  return (
    <>
      <MetaData title="로그인"/>
      <SignInForm />
    </>
  )
}