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
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [service, setService] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("first-name"),
          lastName: formData.get("last-name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service,
          message: formData.get("message"),
        }),
      })

      const json = await res.json()

      if (json.success) {
        setResult({
          type: "success",
          message: "Votre message a ete envoye avec succes. Nous vous contacterons dans les plus brefs delais.",
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

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name" className="text-foreground font-medium">
            Prenom
          </Label>
          <Input
            id="first-name"
            name="first-name"
            required
            placeholder="Votre prenom"
            className="bg-background"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name" className="text-foreground font-medium">
            Nom
          </Label>
          <Input
            id="last-name"
            name="last-name"
            required
            placeholder="Votre nom"
            className="bg-background"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email
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
        <Label htmlFor="service" className="text-foreground font-medium">
          Service
        </Label>
        <Select name="service" value={service} onValueChange={setService}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selectionnez un service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="billets">{"Billets d'avion"}</SelectItem>
            <SelectItem value="visas">Facilitation de visas</SelectItem>
            <SelectItem value="monnaie">Services monnaie mobile</SelectItem>
            <SelectItem value="nettoyage">Service de nettoyage</SelectItem>
            <SelectItem value="traiteur">Service traiteur</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-foreground font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Decrivez votre demande..."
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
          "Envoyer le message"
        )}
      </Button>
    </form>
  )
}
