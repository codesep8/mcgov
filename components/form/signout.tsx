"use client";

import { useFormStatus } from "react-dom";
import { signOut } from "@/lib/actions";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignOutForm() {
  return (
    <div className="flex flex-col gap-6">
      <form action={signOut}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link href="/" className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">{process.env.SITE_NAME}</span>
            </Link>
            <h1 className="text-xl font-bold">로그아웃</h1>
            <div className="text-center text-sm">정말 로그아웃 하시겠습니까?</div>
          </div>
          <div className="flex flex-col gap-6">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button disabled={pending} type="submit" className="w-full">{pending ? '로그아웃중...' : '로그아웃'}</Button>
}