"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
  Eye,
  MousePointerClick,
  Clock,
  TrendingUp,
  MessageSquare,
  Calendar,
  Bell,
} from "lucide-react"

import type { AnalyticsData } from "@/lib/types"

interface TrafficStats {
  activeUsers: number
  totalVisits: number
  pageViews: number
  avgSessionTime: string
  bounceRate: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<TrafficStats>({
    activeUsers: 0,
    totalVisits: 0,
    pageViews: 0,
    avgSessionTime: "0m 0s",
    bounceRate: "0%",
  })
  const [hourlyData, setHourlyData] = useState<number[]>([])
  const [recentActivity, setRecentActivity] = useState<{action: string, page: string, time: string}[]>([])
  const [counts, setCounts] = useState({
    messages: 0,
    bookings: 0,
    notifications: 0,
  })
  const [loading, setLoading] = useState(true)

  // Fetch real analytics data
  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics", { credentials: "include" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data) {
          const analytics: AnalyticsData = data.data
          setStats({
            activeUsers: analytics.activeUsers,
            totalVisits: analytics.totalVisits,
            pageViews: analytics.pageViews,
            avgSessionTime: analytics.avgSessionDuration,
            bounceRate: `${analytics.bounceRate}%`,
          })
          setHourlyData(analytics.hourlyTraffic)
          setRecentActivity(analytics.recentActivity.slice(0, 10))
        }
      }
    } catch {
      // Keep current stats on error
    }
  }

  // Fetch counts
  const fetchCounts = async () => {
    try {
      const [messagesRes, bookingsRes, notifsRes] = await Promise.all([
        fetch("/api/admin/messages/count", { credentials: "include" }),
        fetch("/api/admin/bookings/count", { credentials: "include" }),
        fetch("/api/admin/notifications/count", { credentials: "include" }),
      ])

      if (messagesRes.status === 401 || bookingsRes.status === 401 || notifsRes.status === 401) {
        router.push("/admin/login")
        return
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        setCounts((prev) => ({ ...prev, messages: messagesData.data?.unread || 0 }))
      }
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setCounts((prev) => ({ ...prev, bookings: bookingsData.data?.pending || 0 }))
      }
      if (notifsRes.ok) {
        const notifsData = await notifsRes.json()
        setCounts((prev) => ({ ...prev, notifications: notifsData.data?.total || 0 }))
      }
    } catch {
      // Use default values
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchAnalytics()
    fetchCounts()
    setLoading(false)

    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(() => {
      fetchAnalytics()
      fetchCounts()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Visiteurs actifs",
      value: stats.activeUsers,
      icon: Users,
    },
    {
      title: "Visites totales",
      value: stats.totalVisits.toLocaleString(),
      icon: Eye,
    },
    {
      title: "Pages vues",
      value: stats.pageViews.toLocaleString(),
      icon: MousePointerClick,
    },
    {
      title: "Temps moyen",
      value: stats.avgSessionTime,
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Vue d'ensemble du flux reel du site
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "-" : card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.title === "Visiteurs actifs" ? "En ligne maintenant" : "Aujourd'hui"}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.messages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservations en attente</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.bookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications actives</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.notifications}</div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart - Real Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trafic horaire (24 dernieres heures)
          </CardTitle>
          <CardDescription>
            Nombre de pages vues par heure - Donnees reelles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hourlyData.length > 0 ? (
            <>
              <div className="h-[300px] flex items-end justify-between gap-2 px-2">
                {hourlyData.map((value, i) => {
                  const max = Math.max(...hourlyData, 1)
                  const height = max > 0 ? (value / max) * 100 : 0
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-t-sm relative group cursor-pointer"
                      style={{ height: `${Math.max(height, 5)}%` }}
                      title={`${value} vues`}
                    >
                      <div className="absolute bottom-0 left-0 right-0 bg-primary/60 rounded-t-sm transition-all group-hover:bg-primary" />
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>Il y a 24h</span>
                <span>Il y a 12h</span>
                <span>Maintenant</span>
              </div>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              En attente de donnees...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-time Activity - From Real Data */}
      <Card>
        <CardHeader>
          <CardTitle>Activite recente</CardTitle>
          <CardDescription>Actions en temps reel sur le site (donnees reelles)</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.page}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Aucune activite enregistree. Les actions des visiteurs apparaitront ici.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
