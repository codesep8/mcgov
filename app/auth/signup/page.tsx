import { SignUpForm } from "@/components/form/signup"
import { MetaData } from "@/components/metadata";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getSession();
  if (session.isLoggedIn) {
    return redirect("/");
  }
  return (
    <>
      <MetaData title="회원가입" />
      <SignUpForm />
    </>
  )
}