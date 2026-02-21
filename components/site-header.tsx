"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SiteHeader() {
  const isMobile = useIsMobile()

  const NavLinks = () => (
    <>
      <Link href="/login" className="text-sm text-foreground hover:text-foreground">
        Log in
      </Link>
      <Link href="/explore" className="text-sm text-foreground hover:text-foreground">
        Explore
      </Link>
      <Link href="/how-it-works" className="text-sm text-foreground hover:text-foreground">
        How it works
      </Link>
      <Button className="bg-foreground text-white rounded-full">
        Start a page
      </Button>
    </>
  )

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-[70rem] mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center font-bold text-2xl">
          BakaBoost
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>BakaBoost</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-6">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  )
}

