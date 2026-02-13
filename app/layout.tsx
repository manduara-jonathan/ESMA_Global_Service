import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollRestoration } from "@/components/scroll-restoration"

import { AnalyticsTracker } from "@/components/analytics-tracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MK GLOBAL SERVICE - Services de Voyage, Visa, Monnaie Mobile, Nettoyage et Traiteur",
  description:
    "MK GLOBAL SERVICE offre des services de vente de billets d'avion, facilitation de visas, monnaie mobile, nettoyage d'immeubles et service traiteur.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AnalyticsTracker />
          <ScrollRestoration />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
