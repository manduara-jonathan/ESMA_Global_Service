"use client"

/**
 * Sélecteur de langue FR / EN fluide.
 * Smooth FR / EN language switcher.
 *
 * S'appuie sur `startTransition` pour une bascule sans à-coup et
 * anime le changement via la classe utilitaire `.lang-fade` (voir globals.css).
 */

import { startTransition } from "react"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import type { Locale } from "@/lib/i18n/dictionaries"
import { cn } from "@/lib/utils"

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-background/60 p-0.5 backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Language selector"
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      {OPTIONS.map((option) => {
        const active = option.value === locale
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => startTransition(() => setLocale(option.value))}
            aria-pressed={active}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
