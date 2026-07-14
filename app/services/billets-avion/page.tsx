import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plane,
  Globe,
  Clock,
  CreditCard,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Billets d'avion - ESMA GLOBAL SERVICE",
  description:
    "Reservez vos billets d'avion nationaux et internationaux aux meilleurs tarifs avec ESMA GLOBAL SERVICE.",
}

const features = [
  {
    icon: Globe,
    title: "Destinations mondiales",
    desc: "Acces a toutes les destinations nationales et internationales avec les meilleures compagnies aeriennes.",
  },
  {
    icon: CreditCard,
    title: "Tarifs competitifs",
    desc: "Nous negocions les meilleurs prix pour vous offrir des tarifs imbattables sur tous les vols.",
  },
  {
    icon: Clock,
    title: "Reservation rapide",
    desc: "Processus de reservation simple et rapide, avec confirmation instantanee de votre billet.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie de service",
    desc: "Votre satisfaction est notre priorite. Nous vous assistons avant, pendant et apres votre voyage.",
  },
  {
    icon: Users,
    title: "Voyages de groupe",
    desc: "Tarifs speciaux pour les groupes et les entreprises avec gestion complete de vos deplacements.",
  },
  {
    icon: Plane,
    title: "Toutes les compagnies",
    desc: "Partenariat avec les plus grandes compagnies aeriennes : Air France, Ethiopian, Kenya Airways, et plus.",
  },
]

const steps = [
  { num: "01", title: "Contactez-nous", desc: "Appelez-nous ou remplissez notre formulaire en ligne avec vos dates et destination souhaitees." },
  { num: "02", title: "Recevez votre devis", desc: "Nous recherchons les meilleures offres et vous envoyons un devis detaille sous 24h." },
  { num: "03", title: "Confirmez et payez", desc: "Validez votre choix et effectuez le paiement de maniere securisee." },
  { num: "04", title: "Recevez votre billet", desc: "Votre billet electronique vous est envoye par email. Bon voyage !" },
]

export default function BilletsAvionPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/flights.jpg" alt="Billets d'avion" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b2b2b]/90 to-[#3a3835]/60" />
        </div>
        <div className="container mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              <Plane className="h-4 w-4" />
              Service Voyage
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white text-balance">
              Billets d{"'"}avion nationaux et internationaux
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Voyagez vers toutes les destinations du monde aux meilleurs tarifs.
              Notre equipe d{"'"}experts vous accompagne pour trouver le vol ideal
              adapte a vos besoins et votre budget.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#E8772E] hover:bg-[#d3641d] text-[#2b2b2b] shadow-lg">
                <Link href="/contact">Reserver maintenant</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                <Link href="tel:+243819145660">Appeler</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2b2b2b]/10 text-sm font-medium text-[#2b2b2b] mb-4">
              Nos avantages
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Pourquoi reserver avec nous ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ESMA GLOBAL SERVICE vous offre une experience de reservation
              incomparable avec des avantages exclusifs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.title} className="card-hover border-none shadow-lg bg-card">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#2b2b2b]/10 flex items-center justify-center mb-5">
                    <f.icon className="h-7 w-7 text-[#2b2b2b]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detail image section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/flights-detail.jpg" alt="Aeroport" width={700} height={500} className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                Des vols vers plus de 500 destinations
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Que vous voyagiez pour affaires ou pour le plaisir, nous avons les
                meilleures offres de vols pour vous. Notre reseau de partenaires
                couvre les 5 continents, vous permettant de voyager ou vous le
                souhaitez.
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  "Vols directs et avec escales",
                  "Classe economique, affaires et premiere",
                  "Bagages et assurances inclus",
                  "Modifications flexibles",
                  "Support 24h/24 et 7j/7",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#2b2b2b] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-[#2b2b2b] hover:bg-[#3a3835] text-white">
                <Link href="/contact">
                  Demander un devis <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2b2b2b]/10 text-sm font-medium text-[#2b2b2b] mb-4">
              Comment ca marche
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Reservez en 4 etapes simples
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="text-5xl font-black text-[#2b2b2b]/10 mb-4">{s.num}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-[#E8772E]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#2b2b2b]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Pret a decoller ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Contactez-nous maintenant pour obtenir les meilleurs tarifs pour votre
            prochain voyage. Notre equipe est disponible pour vous aider.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#E8772E] hover:bg-[#d3641d] text-[#2b2b2b] shadow-lg">
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
