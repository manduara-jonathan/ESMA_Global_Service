"use client"

/**
 * FlightCard : carte de destination épurée avec prix, icône de localisation
 * et bouton "Réserver / Book Now". Utilisée dans le catalogue et l'aperçu.
 *
 * FlightCard: clean destination card with price, location icon and a
 * "Book Now" button. Used in the catalog and the home preview.
 */

import Link from "next/link"
import { MapPin, PlaneTakeoff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice, type Flight } from "@/lib/flights"
import { useLanguage } from "@/lib/i18n/context"

export function FlightCard({ flight }: { flight: Flight }) {
  const { t } = useLanguage()

  const tripLabel = flight.roundTrip ? t.flights.roundTrip : t.flights.oneWay
  const priceLabel = flight.priceMin === flight.priceMax ? t.flights.fixedPrice : t.flights.priceRange

  // Pré-remplit le formulaire de contact avec la destination choisie.
  const bookingHref = `/contact?service=flight&destination=${encodeURIComponent(flight.destination)}`

  return (
    <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* En-tête : trajet */}
      <div className="flex items-start justify-between gap-3 border-b border-border/60 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <PlaneTakeoff className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {t.flights.from}
            </p>
            <h3 className="text-lg font-bold leading-tight text-foreground">{flight.destination}</h3>
            {flight.country ? (
              <p className="text-xs text-muted-foreground">{flight.country}</p>
            ) : null}
          </div>
        </div>
        <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-semibold text-secondary">
          {tripLabel}
        </span>
      </div>

      {/* Prix + action */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{priceLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-primary">{formatPrice(flight)}</p>
        </div>
        <Button asChild className="w-full gap-2 group/btn">
          <Link href={bookingHref}>
            {t.flights.bookThisFlight}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  )
}
