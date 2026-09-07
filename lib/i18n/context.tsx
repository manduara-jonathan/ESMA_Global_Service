"use client"

/**
 * Fournisseur de langue (i18n) pour toute l'application.
 * Language (i18n) provider for the whole application.
 *
 * Expose `useLanguage()` qui renvoie :
 *  - locale : la langue courante ("fr" | "en")
 *  - setLocale : pour changer de langue
 *  - t : le dictionnaire de la langue courante (accès direct typé)
 */

import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import {
  DEFAULT_LOCALE,
  dictionaries,
  LOCALES,
  type Dictionary,
  type Locale,
} from "./dictionaries"

const STORAGE_KEY = "esma-locale"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as string[]).includes(value)
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  // Restaure la préférence enregistrée côté client au montage.
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    if (isLocale(stored) && stored !== locale) {
      setLocaleState(stored)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Garde l'attribut <html lang> synchronisé pour l'accessibilité et le SEO.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next)
      // Cookie pour permettre un rendu serveur cohérent si besoin.
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === "fr" ? "en" : "fr")
  }, [locale, setLocale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: dictionaries[locale],
    }),
    [locale, setLocale, toggleLocale],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

export function useLanguage(): LanguageContextValue {
  const ctx = use(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage doit être utilisé à l'intérieur d'un <LanguageProvider>")
  }
  return ctx
}
