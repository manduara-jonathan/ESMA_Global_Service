"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view when pathname changes
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || "direct",
            userAgent: navigator.userAgent,
          }),
        })
      } catch {
        // Silently fail - don't affect user experience
      }
    }

    trackPageView()
  }, [pathname])

  return null
}
