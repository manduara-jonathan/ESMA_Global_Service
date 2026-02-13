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
import { Eye, Mail, Phone, Calendar, Trash2, CheckCircle, Archive } from "lucide-react"

interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  service: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  createdAt: string
}

const statusLabels = {
  new: { label: "Nouveau", color: "bg-blue-500" },
  read: { label: "Lu", color: "bg-amber-500" },
  replied: { label: "Repondu", color: "bg-emerald-500" },
  archived: { label: "Archive", color: "bg-gray-500" },
}

export default function MessagesAdminPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages", { credentials: "include" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (res.ok) {
        const data = await res.json()
        setMessages(data.data?.messages || [])
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: ContactMessage["status"]) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      })
      if (res.ok) {
        fetchMessages()
      }
    } catch {
      // Silent fail
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        fetchMessages()
      }
    } catch {
      // Silent fail
    }
  }

  const filteredMessages = statusFilter === "all" 
    ? messages 
    : messages.filter(m => m.status === statusFilter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages de contact</h1>
        <p className="text-muted-foreground mt-1">
          Gerez les messages recus via le formulaire de contact
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          Tous
        </Button>
        <Button
          variant={statusFilter === "new" ? "default" : "outline"}
          onClick={() => setStatusFilter("new")}
          size="sm"
        >
          Nouveaux
        </Button>
        <Button
          variant={statusFilter === "read" ? "default" : "outline"}
          onClick={() => setStatusFilter("read")}
          size="sm"
        >
          Lus
        </Button>
        <Button
          variant={statusFilter === "replied" ? "default" : "outline"}
          onClick={() => setStatusFilter("replied")}
          size="sm"
        >
          Repondus
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des messages</CardTitle>
          <CardDescription>{filteredMessages.length} message(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Chargement...</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aucun message
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Expediteur</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                      <br />
                      {new Date(message.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {message.firstName} {message.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>{message.service}</TableCell>
                    <TableCell>
                      <Badge className={statusLabels[message.status].color}>
                        {statusLabels[message.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Message de {message.firstName} {message.lastName}</DialogTitle>
                              <DialogDescription>
                                Recu le {new Date(message.createdAt).toLocaleString("fr-FR")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Email
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                                      {message.email}
                                    </a>
                                  </div>
                                </div>
                                {message.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Telephone
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4" />
                                      <a href={`tel:${message.phone}`} className="text-primary hover:underline">
                                        {message.phone}
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Service concerne
                                </label>
                                <p>{message.service}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Message
                                </label>
                                <p className="mt-1 p-3 bg-muted rounded-lg">{message.message}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateStatus(message.id, "replied")}
                          title="Marquer comme repondu"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateStatus(message.id, "archived")}
                          title="Archiver"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMessage(message.id)}
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
