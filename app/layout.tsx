import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollRestoration } from "@/components/scroll-restoration"

import { AnalyticsTracker } from "@/components/analytics-tracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ESMA GLOBAL SERVICE - Services de Voyage, Visa, Monnaie Mobile, Nettoyage et Traiteur",
  description:
    "ESMA GLOBAL SERVICE offre des services de vente de billets d'avion, facilitation de visas, monnaie mobile, nettoyage d'immeubles et service traiteur.",
}

export const viewport: Viewport = {
  themeColor: "#E8772E",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="bg-background">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AnalyticsTracker />
            <ScrollRestoration />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
