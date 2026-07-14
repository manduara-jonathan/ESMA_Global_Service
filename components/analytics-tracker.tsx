"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Defer tracking to idle time so it never competes with critical rendering
    const trackPageView = () => {
      const payload = JSON.stringify({
        path: pathname,
        referrer: document.referrer || "direct",
        userAgent: navigator.userAgent,
      })

      // sendBeacon is non-blocking and survives page navigation
      if (typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" })
        navigator.sendBeacon("/api/analytics", blob)
        return
      }

      // Fallback for browsers without sendBeacon
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silently fail - don't affect user experience
      })
    }

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(trackPageView, { timeout: 2000 })
        : window.setTimeout(trackPageView, 1000)

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle as number)
      } else {
        window.clearTimeout(idle as number)
      }
    }
  }, [pathname])

  return null
}
