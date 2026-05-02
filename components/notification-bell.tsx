"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, X, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Notification } from "@/lib/types"

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications")
      const json = await res.json()
      if (json.success) {
        setNotifications(json.data.notifications)
        setUnreadCount(json.data.unreadCount)
      }
    } catch {
      // Silently fail
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "PATCH" })
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch {
      // Silently fail
    }
  }

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PUT" })
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch {
      // Silently fail
    }
  }

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-emerald-500"
      case "warning":
        return "bg-amber-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-primary"
    }
  }

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "A l'instant"
    if (minutes < 60) return `Il y a ${minutes}min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Il y a ${hours}h`
    const days = Math.floor(hours / 24)
    return `Il y a ${days}j`
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-muted transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
      >
        <Bell className="h-5 w-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A373] text-[11px] font-bold text-white ring-2 ring-background">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-card rounded-xl shadow-2xl ring-1 ring-border z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-sm text-foreground">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Tout marquer comme lu
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-muted"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                Aucune notification
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-3 px-4 py-3 border-b border-border/50 last:border-0 transition-colors ${
                    !notif.read ? "bg-primary/5" : "hover:bg-muted/30"
                  }`}
                >
                  <div
                    className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      !notif.read ? getTypeColor(notif.type) : "bg-muted-foreground/30"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] text-muted-foreground">
                        {formatTime(notif.createdAt)}
                      </span>
                      {notif.link && (
                        <Link
                          href={notif.link}
                          onClick={() => {
                            markAsRead(notif.id)
                            setIsOpen(false)
                          }}
                          className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                        >
                          Voir <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="mt-1 p-1 rounded hover:bg-muted flex-shrink-0"
                      title="Marquer comme lu"
                    >
                      <Check className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
