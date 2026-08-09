"use client"

/**
 * FlightCatalog : composant dynamique, filtrable et interactif.
 *  - Onglets : Vols internationaux vs Vols nationaux
 *  - Barre de recherche instantanée (filtrage par ville de destination)
 *  - Grille de cartes animées à l'entrée
 *
 * FlightCatalog: dynamic, filterable, interactive component with tabs,
 * instant search and an animated card grid.
 */

import { useDeferredValue, useMemo, useState } from "react"
import { Globe2, Plane, Search, SearchX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Reveal } from "@/components/reveal"
import { FlightCard } from "@/components/flights/flight-card"
import { FLIGHTS, type FlightCategory } from "@/lib/flights"
import { useLanguage } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"

export function FlightCatalog() {
  const { t } = useLanguage()
  const [category, setCategory] = useState<FlightCategory>("international")
  const [query, setQuery] = useState("")
  // useDeferredValue : garde la saisie réactive même avec un filtrage plus lourd.
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return FLIGHTS.filter((f) => {
      if (f.category !== category) return false
      if (!q) return true
      return (
        f.destination.toLowerCase().includes(q) ||
        (f.country ? f.country.toLowerCase().includes(q) : false)
      )
    })
  }, [category, deferredQuery])

  const tabs: { value: FlightCategory; label: string; icon: typeof Globe2 }[] = [
    { value: "international", label: t.flights.tabInternational, icon: Globe2 },
    { value: "national", label: t.flights.tabNational, icon: Plane },
  ]

  return (
    <div className="lang-fade" key={t.flights.tabInternational}>
      {/* Onglets + recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1"
          role="tablist"
          aria-label={t.flights.sectionTitle}
        >
          {tabs.map((tab) => {
            const active = tab.value === category
            const Icon = tab.icon
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(tab.value)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.value === "international" ? t.flights.tabInternational.split(" ")[0] : "RDC"}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.flights.searchPlaceholder}
            className="pl-9"
            aria-label={t.flights.searchPlaceholder}
          />
        </div>
      </div>

      {/* Compteur de résultats */}
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {t.flights.resultsCount}
      </p>

      {/* Grille de résultats */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((flight, index) => (
            <Reveal key={flight.id} delay={Math.min(index * 60, 300)}>
              <FlightCard flight={flight} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="text-muted-foreground">{t.flights.noResults}</p>
        </div>
      )}
    </div>
  )
}
