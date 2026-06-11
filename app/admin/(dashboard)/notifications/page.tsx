"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Send, Bell, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
}

const notificationTypes = [
  { value: "info", label: "Information", color: "bg-blue-500" },
  { value: "success", label: "Succes", color: "bg-emerald-500" },
  { value: "warning", label: "Avertissement", color: "bg-amber-500" },
  { value: "error", label: "Erreur", color: "bg-red-500" },
]

export default function NotificationsAdminPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [notifToDelete, setNotifToDelete] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as Notification["type"],
    link: "",
  })

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications", { credentials: "include" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.data?.notifications || [])
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      if (res.ok) {
        setFormData({ title: "", message: "", type: "info", link: "" })
        setDialogOpen(false)
        fetchNotifications()
      }
    } catch {
      // Silent fail
    }
  }

  const promptDeleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setNotifToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDeleteNotification = async () => {
    if (!notifToDelete) return

    const id = notifToDelete
    setDeleteConfirmOpen(false)
    setNotifToDelete(null)

    // Optimistic update - remove from UI immediately
    setNotifications((prev) => prev.filter((n) => n.id !== id))

    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      // Re-sync with source of truth so deleted items don't reappear
      // and reverted ones are restored on failure
      fetchNotifications()
      if (!res.ok) {
        console.error("[v0] Failed to delete notification, status:", res.status)
      }
    } catch (error) {
      console.error("[v0] Error deleting notification:", error)
      // Re-sync to restore correct state
      fetchNotifications()
    }
  }

  const getTypeLabel = (type: Notification["type"]) => {
    return notificationTypes.find((t) => t.value === type)?.label || type
  }

  const getTypeColor = (type: Notification["type"]) => {
    return notificationTypes.find((t) => t.value === type)?.color || "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des notifications</h1>
          <p className="text-muted-foreground mt-1">
            Creez et gerez les notifications pour les utilisateurs
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Creer une notification</DialogTitle>
              <DialogDescription>
                Envoyez une notification a tous les utilisateurs du site
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNotification} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as Notification["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${type.color}`} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Titre</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Nouvelle promotion"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Contenu de la notification..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Lien (optionnel)</label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/services/billets-avion"
                />
                <p className="text-xs text-muted-foreground">
                  Ex: /services/billets-avion pour rediriger vers la page billets
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Links to Service Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liens rapides vers les pages services</CardTitle>
          <CardDescription>
            Cliquez pour creer une notification liee a une page specifique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Billets d'avion", path: "/services/billets-avion" },
              { label: "Facilitation visas", path: "/services/visas" },
              { label: "Monnaie mobile", path: "/services/monnaie-mobile" },
              { label: "Nettoyage", path: "/services/nettoyage" },
              { label: "Service traiteur", path: "/services/traiteur" },
            ].map((service) => (
              <Button
                key={service.path}
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    title: `Nouveau: ${service.label}`,
                    link: service.path,
                  })
                  setDialogOpen(true)
                }}
              >
                <Bell className="h-3 w-3 mr-1" />
                {service.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications actives</CardTitle>
          <CardDescription>Liste des notifications visibles par les utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Chargement...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aucune notification active
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Lien</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell>
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${getTypeColor(notif.type)}`}
                      />
                      <span className="ml-2 text-sm">{getTypeLabel(notif.type)}</span>
                    </TableCell>
                    <TableCell className="font-medium">{notif.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{notif.message}</TableCell>
                    <TableCell>
                      {notif.link ? (
                        <Link
                          href={notif.link}
                          className="text-primary hover:underline text-sm flex items-center gap-1"
                          target="_blank"
                        >
                          {notif.link}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(notif.createdAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => promptDeleteNotification(notif.id, e)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Supprimer la notification</DialogTitle>
            <DialogDescription>
              Etes-vous sur de vouloir supprimer cette notification ? Cette action est definitive.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteNotification}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
