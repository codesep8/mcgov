"use client";

import { useFormStatus } from "react-dom";
import { signUp } from "@/lib/actions";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react";

const initialState = {
  message: ""
}

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, initialState);
  return (
    <div className="flex flex-col gap-6">
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">{process.env.SITE_NAME}</span>
            </Link>
            <h1 className="text-xl font-bold">회원가입</h1>
            <div className="text-center text-sm">
              계정이 있으신가요?&nbsp;
              <Link href="/auth/signin" className="underline underline-offset-4">
                로그인
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
              <Label htmlFor="email">이메일 주소</Label>
              <Input id="email" name="email" type="email" placeholder="example@example.com" required />
              {state?.errors?.username && <p className="text-red-500">{state.errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" name="password" type="password" placeholder="PassWord!!" required />
              {state?.errors?.username && <p className="text-red-500">{state.errors.password}</p>}
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
  return <Button disabled={pending} type="submit" className="w-full">{pending ? '회원가입중...' : '회원가입'}</Button>
}