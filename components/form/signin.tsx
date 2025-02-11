"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { signIn } from "@/lib/actions";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState = {
  message: ""
}

export function SignInForm() {
  const [state, formAction] = useActionState(signIn, initialState);
  return (
    <div className="flex flex-col gap-6">
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">{process.env.SITE_NAME}</span>
            </Link>
            <h1 className="text-xl font-bold">로그인</h1>
            <div className="text-center text-sm">
              계정이 없으신가요?&nbsp;
              <Link href="/auth/signup" className="underline underline-offset-4">
                회원가입
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-red-500">{state?.message}</p>
            <div className="grid gap-2">
              <Label htmlFor="username">마인크래프트 닉네임</Label>
              <Input id="username" name="username" type="text" placeholder="notch" required />
              {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" name="password" type="password" placeholder="PassWord!!" required />
              {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
            </div>
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button disabled={pending} type="submit" className="w-full">{pending ? '로그인중...' : '로그인'}</Button>
}