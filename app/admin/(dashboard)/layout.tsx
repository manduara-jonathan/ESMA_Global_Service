"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Bell,
  Settings,
  MessageSquare,
  Calendar,
  Palette,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, mobileLabel: "Dashboard" },
  { href: "/admin/notifications", label: "Notifications", icon: Bell, mobileLabel: "Notifs" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, mobileLabel: "Messages" },
  { href: "/admin/bookings", label: "Reservations", icon: Calendar, mobileLabel: "Resas" },
  { href: "/admin/site", label: "Controle du site", icon: Palette, mobileLabel: "Site" },
  { href: "/admin/settings", label: "Parametres", icon: Settings, mobileLabel: "Params" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [mounted, setMounted] = useState(false)

  // Mark as mounted (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Verify session on mount with retry logic for timing issues
  useEffect(() => {
    if (!mounted) return
    
    let isCancelled = false
    let attempts = 0
    const maxAttempts = 3
    const delayBetweenAttempts = 200
    
    const verifySession = async () => {
      if (isCancelled) return
      
      try {
        const res = await fetch("/api/auth", { 
          method: "GET",
          credentials: "include",
          cache: "no-store"
        })
        
        if (isCancelled) return
        
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setIsAuthenticated(true)
            return
          }
        }
        
        // Retry with increasing delay (handles cookie timing issues)
        attempts++
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts * attempts))
          return verifySession()
        }
        
        // Not authenticated after retries - redirect to login
        if (!isCancelled) {
          setIsAuthenticated(false)
          window.location.replace("/admin/login")
        }
      } catch (error) {
        if (!isCancelled) {
          setIsAuthenticated(false)
          window.location.replace("/admin/login")
        }
      }
    }
    
    verifySession()
    
    return () => {
      isCancelled = true
    }
  }, [mounted])

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth", { method: "DELETE", credentials: "include" })
      router.push("/admin/login")
      router.refresh()
    } catch {
      router.push("/admin/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Show loading while verifying authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verification de la session...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (redirect is happening)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile/Tablet Header - Always visible on small screens */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 border-b border-border bg-[#2b2b2b] text-white lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8772E]/20 flex items-center justify-center">
            <Shield className="h-4 w-4 text-[#E8772E]" />
          </div>
          <span className="font-bold text-lg text-[#E8772E]">ESMA ADMIN</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className="flex pt-14 lg:pt-0">
        {/* Sidebar - Fixed on mobile, static on desktop */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-72 lg:w-64 bg-[#2b2b2b] text-white transition-transform duration-300 ease-in-out lg:h-screen lg:min-h-screen`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Logo - Desktop only */}
            <div className="hidden lg:block p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8772E]/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#E8772E]" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-[#E8772E]">ESMA ADMIN</h1>
                  <p className="text-white/60 text-xs">Securise</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                // Dashboard root (/admin) must match exactly, otherwise it would
                // stay active for every /admin/* sub-route. Other items use prefix match.
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname?.startsWith(`${item.href}/`)
                const label = isMobile ? item.mobileLabel : item.label
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#E8772E]/20 text-[#E8772E] font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>{isLoggingOut ? "Deconnexion..." : "Deconnexion"}</span>
              </button>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>Retour au site</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile/tablet */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full lg:ml-0">
          <div className="p-3 sm:p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
