import Link from "next/link";
import { getSession } from "@/lib/session"
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { Bell } from 'lucide-react'
import { NavItems, NavSheet } from "@/components/layout/client"
import { ThemeToggle } from "../toggleTheme";


async function UserMenu() {
    const session = await getSession();
    return (
        <div>
            {session.isLoggedIn ?
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://crafatar.com/avatars/${session.id}`} alt={session.username} />
                    <AvatarFallback>🔄</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <p>{session.username}</p>
                  <p>{session.point}P</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/signout">로그아웃</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>    
            :
            <Link href="/auth/signin" className={buttonVariants({ variant: "default" })}>로그인</Link>
            }
        </div>
    )
}

export function Header() {
    return (
      <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">{process.env.SITE_NAME}</Link>
            <NavItems />
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle/>
            {/*다크모드버튼 
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>*/}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button> 
            <Suspense fallback={<>Loading...</>}>
              <UserMenu />
            </Suspense>
            <NavSheet />
          </div>
        </nav>
      </div>
    </header>
    )
}