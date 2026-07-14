import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Stamp,
  FileText,
  Clock,
  Globe,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Facilitation de Visas - ESMA GLOBAL SERVICE",
  description:
    "Obtenez votre visa touristique, affaires ou etudes rapidement avec l'accompagnement expert de ESMA GLOBAL SERVICE.",
}

const visaTypes = [
  { title: "Visa touristique", desc: "Pour vos vacances et voyages de loisirs dans le monde entier.", duration: "5-15 jours" },
  { title: "Visa affaires", desc: "Pour vos deplacements professionnels, conferences et reunions.", duration: "7-20 jours" },
  { title: "Visa etudes", desc: "Pour poursuivre vos etudes dans les universites a l'etranger.", duration: "15-30 jours" },
  { title: "Visa transit", desc: "Pour les escales et correspondances internationales.", duration: "3-5 jours" },
]

const features = [
  { icon: FileText, title: "Constitution du dossier", desc: "Nous vous guidons pas a pas dans la preparation de tous les documents requis." },
  { icon: Globe, title: "Tous les pays", desc: "Facilitation de visas pour l'Europe, l'Amerique, l'Asie, et bien d'autres destinations." },
  { icon: Clock, title: "Delais optimises", desc: "Traitement rapide de votre dossier pour respecter vos dates de voyage." },
  { icon: ShieldCheck, title: "Taux de reussite eleve", desc: "Notre expertise garantit un taux d'acceptation superieur a la moyenne." },
  { icon: HeadphonesIcon, title: "Suivi permanent", desc: "Vous etes informe a chaque etape de l'avancement de votre demande." },
  { icon: Stamp, title: "Formalites completes", desc: "Nous prenons en charge toutes les formalites administratives pour vous." },
]

export default function VisasPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/visas.jpg" alt="Facilitation de visas" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b2b2b]/90 to-[#3a3835]/60" />
        </div>
        <div className="container mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              <Stamp className="h-4 w-4" />
              Service Visa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white text-balance">
              Facilitation de visas touristiques et autres
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Simplifiez vos demarches de visa avec notre equipe d{"'"}experts.
              Nous vous accompagnons de A a Z pour maximiser vos chances
              d{"'"}obtenir votre visa.
            </p>
            <Button asChild size="lg" className="bg-[#E8772E] hover:bg-[#d3641d] text-white shadow-lg">
              <Link href="/contact">Commencer ma demande</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2b2b2b]/10 text-sm font-medium text-[#2b2b2b] mb-4">
              Types de visas
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nous traitons tous les types de visas
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaTypes.map((v) => (
              <Card key={v.title} className="card-hover border-none shadow-lg bg-card text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-[#2b2b2b]/10 flex items-center justify-center mx-auto mb-5">
                    <Stamp className="h-8 w-8 text-[#2b2b2b]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{v.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E8772E]/10 text-[#E8772E] text-xs font-medium">
                    Delai : {v.duration}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detail section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                Un accompagnement complet pour votre visa
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Obtenir un visa peut etre un processus complexe et stressant.
                Chez ESMA GLOBAL SERVICE, nous simplifions chaque etape pour
                vous permettre de vous concentrer sur la preparation de votre voyage.
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  "Analyse gratuite de votre eligibilite",
                  "Liste personnalisee des documents requis",
                  "Verification et correction de votre dossier",
                  "Prise de rendez-vous a l'ambassade",
                  "Preparation a l'entretien consulaire",
                  "Suivi en temps reel de votre demande",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#2b2b2b] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-[#2b2b2b] hover:bg-[#3a3835] text-white">
                <Link href="/contact">
                  Contactez un expert <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/visas-detail.jpg" alt="Visa services" width={700} height={500} className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nos avantages
            </h2>
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

      {/* CTA */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#2b2b2b]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Lancez votre demande de visa aujourd{"'"}hui
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Ne laissez pas les formalites administratives freiner vos projets
            de voyage. Contactez-nous pour un accompagnement personnalise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#E8772E] hover:bg-[#d3641d] text-white shadow-lg">
              <Link href="/contact">Commencer maintenant</Link>
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
