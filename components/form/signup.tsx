"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpForm() {
  return (
    <div className="flex flex-col gap-6">
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">Iodine</span>
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
            <div className="grid gap-2">
              <Label htmlFor="mcname">마인크래프트 닉네임</Label>
              <Input id="mcname" name="mcname" type="text" placeholder="notch" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일 주소</Label>
              <Input id="email" name="email" type="email" placeholder="example@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" name="password" type="password" placeholder="PassWord!!" required />
            </div>
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
