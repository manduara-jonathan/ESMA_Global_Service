"use client"

import { PlaneTakeoff } from "lucide-react"
import { FlightCatalog } from "@/components/flights/flight-catalog"
import { useLanguage } from "@/lib/i18n/context"

/**
 * Page dédiée "Vols & Tarifs" : grille tarifaire complète, filtrable.
 * Dedicated "Flights & Fares" page: full, filterable fare grid.
 */
export default function FlightsPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      {/* En-tête de page */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/30" aria-hidden="true" />
        <div className="container relative mx-auto px-4 py-20 md:py-24">
          <div className="animate-fade-in-up max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground">
              <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
              {t.flights.sectionBadge}
            </span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              {t.flights.pageTitle}
            </h1>
            <p className="mt-4 text-pretty text-lg text-secondary-foreground/80">
              {t.flights.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <FlightCatalog />
      </section>
    </main>
  )
}
