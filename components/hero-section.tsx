"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, PlaneTakeoff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"

export function HeroSection() {
  const { t } = useLanguage()

  const stats = [
    { value: "15+", label: t.hero.stats.destinations },
    { value: "5K+", label: t.hero.stats.clients },
    { value: "10+", label: t.hero.stats.experience },
  ]

  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden px-4 py-24 md:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={70}
          priority
          fetchPriority="high"
        />
      </div>
      {/* Overlay sombre subtil pour la lisibilité */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#2b2b2b]/92 via-[#3a3835]/72 to-[#E8772E]/45" />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <span className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
              {t.hero.badge}
            </span>
            <h1
              className="animate-fade-in-up mb-6 text-balance text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.title}
            </h1>
            <p
              className="animate-fade-in-up mb-8 max-w-xl text-pretty text-lg leading-relaxed text-white/90"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.subtitle}
            </p>
            <div
              className="animate-fade-in-up flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Button
                asChild
                size="lg"
                className="group gap-2 bg-[#E8772E] font-semibold text-white shadow-lg shadow-[#E8772E]/25 hover:bg-[#d3641d]"
              >
                <Link href="/vols">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 bg-transparent text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">{t.hero.ctaSecondary}</Link>
              </Button>
            </div>

            {/* Statistiques */}
            <dl
              className="animate-fade-in-up mt-12 grid max-w-md grid-cols-3 gap-6"
              style={{ animationDelay: "320ms" }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-extrabold text-[#E8772E] md:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-xs text-white/80 md:text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image
                src="/images/hero-services.jpg"
                alt={t.common.brand}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
                quality={75}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[hsl(40,33%,98%)] to-transparent" />
    </section>
  )
}
