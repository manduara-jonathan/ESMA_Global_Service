"use client"

import Link from "next/link"
import {
  Plane,
  Wallet,
  Sparkles,
  UtensilsCrossed,
  Stamp,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { FlightsPreview } from "@/components/flights/flights-preview"
import { TestimonialSection } from "@/components/testimonial-section"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/lib/i18n/context"

export default function Home() {
  const { t } = useLanguage()

  // Services synthétiques (grille de cartes) alimentés par le dictionnaire.
  const services = [
    { icon: Plane, key: "flights", href: "/services/billets-avion" },
    { icon: Stamp, key: "visa", href: "/services/visas" },
    { icon: Wallet, key: "mobileMoney", href: "/services/monnaie-mobile" },
    { icon: Sparkles, key: "cleaning", href: "/services/nettoyage" },
    { icon: UtensilsCrossed, key: "catering", href: "/services/traiteur" },
  ] as const

  const advantages = [
    { icon: Shield, title: t.about.values.trust, desc: t.services.items.flights.description },
    { icon: Clock, title: t.about.values.speed, desc: t.services.items.mobileMoney.description },
    { icon: Users, title: t.about.values.excellence, desc: t.services.items.visa.description },
    { icon: Wallet, title: t.about.values.proximity, desc: t.services.items.catering.description },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Aperçu des tarifs de vols */}
      <FlightsPreview />

      {/* Section Services (grille de cartes) */}
      <section className="bg-background px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Reveal className="mb-14 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {t.services.sectionBadge}
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-gradient md:text-4xl">
              {t.services.sectionTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {t.services.sectionSubtitle}
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              const item = t.services.items[service.key]
              return (
                <Reveal key={service.key} delay={Math.min(index * 60, 300)}>
                  <Link href={service.href} className="block h-full">
                    <Card className="hover-lift group h-full border border-border bg-card">
                      <CardHeader>
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <CardTitle className="flex items-center justify-between gap-2 text-foreground">
                          {item.title}
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="bg-muted/30 px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Reveal className="mb-14 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {t.about.valuesTitle}
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-gradient md:text-4xl">
              {t.about.sectionTitle}
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index * 60, 300)}>
                <Card className="hover-lift h-full border-none bg-card shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialSection />

      {/* Section Contact */}
      <section className="bg-background px-4 py-20 md:px-6 lg:px-8" id="contact">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {t.contact.sectionBadge}
              </span>
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-gradient md:text-4xl">
                {t.contact.pageTitle}
              </h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">{t.contact.pageSubtitle}</p>

              <div className="flex flex-col gap-8">
                {[
                  { icon: Phone, title: t.contact.phoneLabel, value: "+243 819 145 660", link: "https://wa.me/243819145660" },
                  { icon: Mail, title: t.contact.emailLabel, value: t.contact.email, link: `mailto:${t.contact.email}` },
                  { icon: MapPin, title: t.contact.addressLabel, value: t.contact.address, link: null },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-muted-foreground transition-colors hover:text-primary hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative rounded-2xl bg-card p-8 shadow-xl ring-1 ring-border">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
