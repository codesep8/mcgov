"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";

//네비바 링크
const navLinks = [
    { href: "/notice", label: "공지" },
    { href: "/d", label: "문의" },
    { href: "/deposit", label: "이체" },
]

function NavItems() {
    return (
        <div className="hidden md:flex ml-6 space-x-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary">
                    {link.label}
                  </Link>
                ))}
        </div>
    )
}

function NavSheet() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <SheetHeader>
                    <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm font-medium hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export {
    NavItems,
    NavSheet
}