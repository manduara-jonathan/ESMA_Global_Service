"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NotificationBell } from "@/components/notification-bell"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "A propos" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-background">
              <div className="px-7">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-gradient"
                  onClick={() => setIsOpen(false)}
                >
                  ESMA GLOBAL SERVICE
                </Link>
              </div>
              <nav className="flex flex-col gap-4 text-lg mt-8 px-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-primary transition-colors text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 px-7">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-bold text-xl hidden md:flex text-gradient">
            ESMA GLOBAL SERVICE
          </Link>
          <Link href="/" className="font-bold text-xl md:hidden text-gradient">
            ESMA
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NotificationBell />
          <div className="hidden md:flex">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
