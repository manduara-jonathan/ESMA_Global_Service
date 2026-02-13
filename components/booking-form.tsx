"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle2, AlertCircle, Calendar } from "lucide-react"

const services = [
  { value: "billets", label: "Billets d'avion" },
  { value: "visas", label: "Facilitation de visas" },
  { value: "monnaie", label: "Services monnaie mobile" },
  { value: "nettoyage", label: "Service de nettoyage" },
  { value: "traiteur", label: "Service traiteur" },
]

interface BookingFormProps {
  defaultService?: string
}

export function BookingForm({ defaultService }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [service, setService] = useState(defaultService || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service || formData.get("service"),
          customerName: formData.get("name"),
          customerEmail: formData.get("email"),
          customerPhone: formData.get("phone"),
          date: formData.get("date"),
          details: formData.get("details"),
        }),
      })

      const json = await res.json()

      if (json.success) {
        setResult({
          type: "success",
          message: "Votre reservation a ete envoyee avec succes. Nous vous contacterons dans les plus brefs delais.",
        })
        const form = e.target as HTMLFormElement
        form.reset()
        setService("")
      } else {
        setResult({
          type: "error",
          message: json.error || "Une erreur est survenue.",
        })
      }
    } catch {
      setResult({
        type: "error",
        message: "Erreur de connexion. Veuillez reessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {result && (
        <div
          className={`flex items-start gap-3 rounded-lg p-4 text-sm ${
            result.type === "success"
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
              : "bg-red-50 text-red-800 ring-1 ring-red-200"
          }`}
        >
          {result.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p>{result.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="service" className="text-foreground font-medium">
          Service souhaite *
        </Label>
        <Select
          name="service"
          value={service}
          onValueChange={setService}
          required
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selectionnez un service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-foreground font-medium">
          Nom complet *
        </Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Votre nom complet"
          className="bg-background"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="votre@email.com"
          className="bg-background"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-foreground font-medium">
          Telephone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+243 XXX XXX XXX"
          className="bg-background"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="date" className="text-foreground font-medium">
          Date souhaitee *
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="date"
            name="date"
            type="date"
            required
            className="bg-background pl-10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="details" className="text-foreground font-medium">
          Details supplementaires
        </Label>
        <Textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Decrivez votre besoin (nombre de personnes, destination, etc.)..."
          className="bg-background"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer la demande"
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Ou contactez-nous directement :{`
        `}
        <a href="tel:+243819145660" className="text-primary hover:underline">
          +243 819 145 660
        </a>
        {` `}|{` `}
        <a href="mailto:mkglobalservices01@gmail.com" className="text-primary hover:underline">
          mkglobalservices01@gmail.com
        </a>
      </div>
    </form>
  )
}
