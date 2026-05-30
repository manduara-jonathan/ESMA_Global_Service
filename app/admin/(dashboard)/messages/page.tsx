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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Eye, 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle, 
  Archive, 
  Reply, 
  Loader2,
  Send,
  X
} from "lucide-react"

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
  new: { label: "Nouveau", color: "bg-blue-500 text-white" },
  read: { label: "Lu", color: "bg-amber-500 text-white" },
  replied: { label: "Repondu", color: "bg-emerald-500 text-white" },
  archived: { label: "Archive", color: "bg-gray-500 text-white" },
}

const serviceLabels: Record<string, string> = {
  billets: "Billets d'avion",
  visas: "Facilitation de visas",
  monnaie: "Services monnaie mobile",
  nettoyage: "Service de nettoyage",
  traiteur: "Service traiteur",
  autre: "Autre",
  general: "General",
}

export default function MessagesAdminPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [replySubject, setReplySubject] = useState("")
  const [replyMessage, setReplyMessage] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  const [replyError, setReplyError] = useState<string | null>(null)
  const [replySuccess, setReplySuccess] = useState(false)

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
        setViewDialogOpen(false)
        setSelectedMessage(null)
      }
    } catch {
      // Silent fail
    }
  }

  const openViewDialog = (message: ContactMessage) => {
    setSelectedMessage(message)
    setViewDialogOpen(true)
    // Mark as read if new
    if (message.status === "new") {
      updateStatus(message.id, "read")
    }
  }

  const openReplyDialog = (message: ContactMessage) => {
    setSelectedMessage(message)
    setReplySubject(`Re: ${serviceLabels[message.service] || message.service} - ESMA GLOBAL SERVICE`)
    setReplyMessage("")
    setReplyError(null)
    setReplySuccess(false)
    setReplyDialogOpen(true)
  }

  const sendReply = async () => {
    if (!selectedMessage || !replyMessage.trim()) {
      setReplyError("Veuillez entrer un message")
      return
    }

    setSendingReply(true)
    setReplyError(null)

    try {
      const res = await fetch(`/api/admin/messages/${selectedMessage.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: replySubject,
          message: replyMessage,
        }),
        credentials: "include",
      })

      const data = await res.json()

      if (data.success) {
        setReplySuccess(true)
        fetchMessages()
        setTimeout(() => {
          setReplyDialogOpen(false)
          setReplySuccess(false)
        }, 2000)
      } else {
        setReplyError(data.error || "Erreur lors de l'envoi")
      }
    } catch {
      setReplyError("Erreur de connexion")
    } finally {
      setSendingReply(false)
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
      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          Tous ({messages.length})
        </Button>
        <Button
          variant={statusFilter === "new" ? "default" : "outline"}
          onClick={() => setStatusFilter("new")}
          size="sm"
        >
          Nouveaux ({messages.filter(m => m.status === "new").length})
        </Button>
        <Button
          variant={statusFilter === "read" ? "default" : "outline"}
          onClick={() => setStatusFilter("read")}
          size="sm"
        >
          Lus ({messages.filter(m => m.status === "read").length})
        </Button>
        <Button
          variant={statusFilter === "replied" ? "default" : "outline"}
          onClick={() => setStatusFilter("replied")}
          size="sm"
        >
          Repondus ({messages.filter(m => m.status === "replied").length})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des messages</CardTitle>
          <CardDescription>{filteredMessages.length} message(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aucun message
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">Date</TableHead>
                    <TableHead className="min-w-[180px]">Expediteur</TableHead>
                    <TableHead className="min-w-[120px]">Service</TableHead>
                    <TableHead className="min-w-[200px]">Apercu</TableHead>
                    <TableHead className="min-w-[100px]">Statut</TableHead>
                    <TableHead className="min-w-[180px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow 
                      key={message.id} 
                      className={message.status === "new" ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}
                    >
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                        <br />
                        <span className="text-xs">
                          {new Date(message.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {message.firstName} {message.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                          {message.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {serviceLabels[message.service] || message.service}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[200px]">
                          {message.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusLabels[message.status].color}>
                          {statusLabels[message.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(message)}
                            title="Voir le message"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openReplyDialog(message)}
                            title="Repondre"
                            className="text-primary hover:text-primary"
                          >
                            <Reply className="h-4 w-4" />
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
                            title="Supprimer"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Message de {selectedMessage.firstName} {selectedMessage.lastName}
                </DialogTitle>
                <DialogDescription>
                  Recu le {new Date(selectedMessage.createdAt).toLocaleString("fr-FR")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${selectedMessage.email}`} 
                        className="text-primary hover:underline break-all"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  {selectedMessage.phone && (
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Telephone
                      </label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`tel:${selectedMessage.phone}`} 
                          className="text-primary hover:underline"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Service concerne
                  </label>
                  <p className="text-foreground">
                    {serviceLabels[selectedMessage.service] || selectedMessage.service}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <div className="mt-1 p-4 bg-muted rounded-lg whitespace-pre-wrap text-foreground">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedMessage.id, "archived")}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archiver
                </Button>
                <Button
                  onClick={() => {
                    setViewDialogOpen(false)
                    openReplyDialog(selectedMessage)
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Repondre
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Reply className="h-5 w-5" />
                  Repondre a {selectedMessage.firstName} {selectedMessage.lastName}
                </DialogTitle>
                <DialogDescription>
                  La reponse sera envoyee a: {selectedMessage.email}
                </DialogDescription>
              </DialogHeader>
              
              {replySuccess ? (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-lg font-medium text-emerald-600">
                    Reponse envoyee avec succes!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mt-4">
                    {/* Original message preview */}
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <p className="text-muted-foreground mb-1">Message original:</p>
                      <p className="text-foreground line-clamp-3">{selectedMessage.message}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reply-subject">Sujet</Label>
                      <Input
                        id="reply-subject"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        placeholder="Sujet de la reponse"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reply-message">Votre reponse</Label>
                      <Textarea
                        id="reply-message"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Ecrivez votre reponse ici..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>
                    
                    {replyError && (
                      <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                        {replyError}
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setReplyDialogOpen(false)}
                      disabled={sendingReply}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button
                      onClick={sendReply}
                      disabled={sendingReply || !replyMessage.trim()}
                    >
                      {sendingReply ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
