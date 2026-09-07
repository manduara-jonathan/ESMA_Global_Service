"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NotificationBell } from "@/components/notification-bell"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  // Liens de navigation traduits (dérivés du dictionnaire courant).
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/vols", label: t.nav.flights },
    { href: "/services", label: t.nav.services },
    { href: "/a-propos", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/faq", label: t.nav.faq },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 ${
        scrolled ? "shadow-sm border-border" : "border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-background">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="ESMA GLOBAL SERVICE"
                    width={150}
                    height={60}
                    className="h-12 w-auto"
                  />
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
              <div className="mt-8 flex flex-col gap-4 px-7">
                <LanguageSwitcher />
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/contact">{t.common.requestQuote}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:flex items-center" aria-label={`${t.common.brand} - ${t.nav.home}`}>
            <Image
              src="/logo.png"
              alt="ESMA GLOBAL SERVICE"
              width={170}
              height={68}
              priority
              className="h-11 w-auto"
            />
          </Link>
          <Link href="/" className="md:hidden flex items-center" aria-label={`${t.common.brand} - ${t.nav.home}`}>
            <Image
              src="/logo.png"
              alt="ESMA GLOBAL SERVICE"
              width={130}
              height={52}
              priority
              className="h-9 w-auto"
            />
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
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <NotificationBell />
          <div className="hidden md:flex">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Link href="/contact">{t.common.requestQuote}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
