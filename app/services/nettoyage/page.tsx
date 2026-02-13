import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Building2,
  Leaf,
  Clock,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Service de Nettoyage - MK GLOBAL SERVICE",
  description:
    "Service professionnel de nettoyage d'immeubles, bureaux et locaux commerciaux par MK GLOBAL SERVICE.",
}

const features = [
  { icon: Building2, title: "Immeubles et bureaux", desc: "Nettoyage complet d'immeubles residentiels, bureaux et espaces commerciaux." },
  { icon: Leaf, title: "Produits ecologiques", desc: "Utilisation de produits respectueux de l'environnement et certifies pour votre sante." },
  { icon: Clock, title: "Horaires flexibles", desc: "Interventions programmees selon vos disponibilites, y compris le week-end." },
  { icon: Award, title: "Personnel qualifie", desc: "Equipe formee aux normes professionnelles avec experience et rigueur." },
  { icon: Users, title: "Equipe dediee", desc: "Une equipe attitre pour votre site, garantissant constance et qualite." },
  { icon: Sparkles, title: "Resultat impeccable", desc: "Controle qualite systematique apres chaque intervention pour votre satisfaction." },
]

const prestations = [
  "Nettoyage quotidien de bureaux",
  "Entretien des parties communes d'immeubles",
  "Nettoyage de vitres et facades",
  "Shampouinage de moquettes et tapis",
  "Nettoyage apres travaux ou demenagement",
  "Desinfection et traitement anti-bacterien",
  "Entretien des sols (carrelage, parquet, marbre)",
  "Nettoyage de parkings et espaces exterieurs",
]

export default function NettoyagePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/cleaning.jpg" alt="Service de nettoyage" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021a2e]/90 to-[#0270bd]/60" />
        </div>
        <div className="container mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              <Sparkles className="h-4 w-4" />
              Service Nettoyage
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white text-balance">
              Service de nettoyage professionnel
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Des locaux impeccables pour votre image de marque. Notre equipe
              de professionnels assure l{"'"}entretien de vos espaces avec
              rigueur et des produits respectueux de l{"'"}environnement.
            </p>
            <Button asChild size="lg" className="bg-[#e0822d] hover:bg-[#d16522] text-white shadow-lg">
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0270bd]/10 text-sm font-medium text-[#0270bd] mb-4">
              Nos atouts
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Un nettoyage professionnel de qualite
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.title} className="card-hover border-none shadow-lg bg-card">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#0270bd]/10 flex items-center justify-center mb-5">
                    <f.icon className="h-7 w-7 text-[#0270bd]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations + image */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                Nos prestations de nettoyage
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nous offrons une gamme complete de services de nettoyage
                adaptes a tous types de locaux. Chaque prestation est realisee
                par des professionnels formes et equipes du meilleur materiel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {prestations.map((p) => (
                  <div key={p} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#0270bd] flex-shrink-0" />
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-[#0270bd] hover:bg-[#035999] text-white">
                <Link href="/contact">
                  Obtenir un devis <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/cleaning-detail.jpg" alt="Nettoyage professionnel" width={700} height={500} className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nos formules
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez la formule qui correspond a vos besoins. Nous proposons
              des tarifs personnalises pour chaque situation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ponctuel",
                desc: "Intervention unique pour un nettoyage en profondeur.",
                items: ["Nettoyage complet une fois", "Devis personnalise", "Equipe dediee", "Produits inclus"],
              },
              {
                name: "Regulier",
                desc: "Entretien hebdomadaire ou bi-hebdomadaire de vos locaux.",
                items: ["Passages reguliers planifies", "Equipe attitre", "Controle qualite", "Tarif prefentiel", "Produits inclus"],
                popular: true,
              },
              {
                name: "Premium",
                desc: "Service complet avec interventions quotidiennes.",
                items: ["Nettoyage quotidien", "Equipe attitre permanente", "Controle qualite journalier", "Remplacement garanti", "Support prioritaire", "Produits premium inclus"],
              },
            ].map((plan) => (
              <Card key={plan.name} className={`card-hover border-none shadow-lg bg-card relative ${plan.popular ? "ring-2 ring-[#0270bd]" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0270bd] text-white text-xs font-medium rounded-full">
                    Populaire
                  </div>
                )}
                <CardContent className="pt-8 pb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
                  <ul className="flex flex-col gap-3 mb-8">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-[#0270bd] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full ${plan.popular ? "bg-[#0270bd] hover:bg-[#035999] text-white" : "bg-muted text-foreground hover:bg-muted/80"}`}>
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#021a2e]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Des locaux propres, une image impeccable
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Faites confiance a MK GLOBAL SERVICE pour l{"'"}entretien de vos
            espaces. Demandez votre devis gratuit des maintenant.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#e0822d] hover:bg-[#d16522] text-white shadow-lg">
              <Link href="/contact">Devis gratuit</Link>
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
