"use client"

/**
 * FlightsPreview : aperçu des tarifs sur la page d'accueil.
 * Affiche une sélection de destinations populaires + un lien vers /vols.
 *
 * FlightsPreview: fare preview on the home page. Shows a selection of
 * popular destinations plus a link to the full /vols catalog.
 */

import Link from "next/link"
import { ArrowRight, PlaneTakeoff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { FlightCard } from "@/components/flights/flight-card"
import { FLIGHTS } from "@/lib/flights"
import { useLanguage } from "@/lib/i18n/context"

// Sélection de 6 destinations phares (3 internationales + 3 nationales).
const PREVIEW_IDS = ["kin-dxb", "kin-par", "kin-jnb", "kin-fki", "kin-fbm", "kin-klz"]
const PREVIEW_FLIGHTS = PREVIEW_IDS.map((id) => FLIGHTS.find((f) => f.id === id)!).filter(Boolean)

export function FlightsPreview() {
  const { t } = useLanguage()

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
            {t.flights.sectionBadge}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
            {t.flights.previewTitle}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">{t.flights.previewSubtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_FLIGHTS.map((flight, index) => (
            <Reveal key={flight.id} delay={Math.min(index * 60, 300)}>
              <FlightCard flight={flight} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="secondary" className="gap-2 group">
            <Link href="/vols">
              {t.flights.viewAllFlights}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
