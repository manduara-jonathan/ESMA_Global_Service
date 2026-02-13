"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Calendar, User, Mail, Phone, Trash2, CheckCircle, XCircle } from "lucide-react"

interface BookingRequest {
  id: string
  service: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  details: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
}

const statusLabels = {
  pending: { label: "En attente", color: "bg-amber-500" },
  confirmed: { label: "Confirmee", color: "bg-emerald-500" },
  cancelled: { label: "Annulee", color: "bg-red-500" },
  completed: { label: "Terminee", color: "bg-blue-500" },
}

export default function BookingsAdminPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings", { credentials: "include" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (res.ok) {
        const data = await res.json()
        setBookings(data.data?.bookings || [])
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: BookingRequest["status"]) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      })
      if (res.ok) {
        fetchBookings()
      }
    } catch {
      // Silent fail
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm("Supprimer cette reservation ?")) return
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        fetchBookings()
      }
    } catch {
      // Silent fail
    }
  }

  const filteredBookings = statusFilter === "all"
    ? bookings
    : bookings.filter(b => b.status === statusFilter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="text-muted-foreground mt-1">
          Gerez les demandes de reservation de services
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          Toutes
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => setStatusFilter("pending")}
          size="sm"
        >
          En attente
        </Button>
        <Button
          variant={statusFilter === "confirmed" ? "default" : "outline"}
          onClick={() => setStatusFilter("confirmed")}
          size="sm"
        >
          Confirmees
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          onClick={() => setStatusFilter("completed")}
          size="sm"
        >
          Terminees
        </Button>
        <Button
          variant={statusFilter === "cancelled" ? "default" : "outline"}
          onClick={() => setStatusFilter("cancelled")}
          size="sm"
        >
          Annulees
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des reservations</CardTitle>
          <CardDescription>{filteredBookings.length} reservation(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Chargement...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aucune reservation
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date demande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date prevue</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.customerName}</div>
                      <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(booking.date).toLocaleDateString("fr-FR")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusLabels[booking.status].color}>
                        {statusLabels[booking.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Details de la reservation</DialogTitle>
                              <DialogDescription>
                                Reservation #{booking.id} - {booking.service}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <a href={`mailto:${booking.customerEmail}`} className="text-primary hover:underline">
                                    {booking.customerEmail}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <a href={`tel:${booking.customerPhone}`} className="text-primary hover:underline">
                                    {booking.customerPhone}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(booking.date).toLocaleDateString("fr-FR")}</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Details supplementaires
                                </label>
                                <p className="mt-1 p-3 bg-muted rounded-lg">{booking.details || "Aucun detail supplementaire"}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Select
                          value={booking.status}
                          onValueChange={(value) => updateStatus(booking.id, value as BookingRequest["status"])}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="confirmed">Confirmer</SelectItem>
                            <SelectItem value="completed">Terminer</SelectItem>
                            <SelectItem value="cancelled">Annuler</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
