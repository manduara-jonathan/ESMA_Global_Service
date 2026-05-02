import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Wallet,
  Send,
  ShieldCheck,
  Smartphone,
  Banknote,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Services Monnaie Mobile - MK GLOBAL SERVICE",
  description:
    "Transferts d'argent, paiements de factures et recharges telephoniques rapides et securises avec MK GLOBAL SERVICE.",
}

const features = [
  { icon: Send, title: "Transferts rapides", desc: "Envoyez et recevez de l'argent instantanement, partout dans le pays et a l'international." },
  { icon: Banknote, title: "Paiements de factures", desc: "Payez toutes vos factures (eau, electricite, internet) en un seul geste." },
  { icon: Smartphone, title: "Recharges telephoniques", desc: "Rechargez votre credit telephonique pour tous les operateurs instantanement." },
  { icon: ShieldCheck, title: "Transactions securisees", desc: "Chaque transaction est protegee par un systeme de securite avance." },
  { icon: Zap, title: "Service instantane", desc: "Pas d'attente, vos operations sont traitees en temps reel." },
  { icon: Wallet, title: "Frais reduits", desc: "Des frais de transaction parmi les plus bas du marche pour toutes vos operations." },
]

const operations = [
  { title: "Depot d'argent", desc: "Depositez de l'argent sur votre compte mobile rapidement." },
  { title: "Retrait d'argent", desc: "Retirez vos fonds a tout moment dans nos points de service." },
  { title: "Transfert national", desc: "Envoyez de l'argent partout dans le pays en quelques secondes." },
  { title: "Transfert international", desc: "Envoyez de l'argent a vos proches a l'etranger facilement." },
  { title: "Paiement marchand", desc: "Payez vos achats chez nos partenaires marchands." },
  { title: "Paiement de factures", desc: "Reglez toutes vos factures mensuelles en toute simplicite." },
]

export default function MonnaieeMobilePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/mobile-money.jpg" alt="Monnaie mobile" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/90 to-[#034a30]/60" />
        </div>
        <div className="container mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              <Wallet className="h-4 w-4" />
              Service Finance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white text-balance">
              Services monnaie mobile
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Effectuez vos transactions financieres en toute simplicite et
              securite. Transferts, paiements, recharges : tout est possible
              avec notre service monnaie mobile.
            </p>
            <Button asChild size="lg" className="bg-[#D4A373] hover:bg-[#c28a52] text-white shadow-lg">
              <Link href="/contact">Commencer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#023020]/10 text-sm font-medium text-[#023020] mb-4">
              Avantages
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Vos finances en toute simplicite
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.title} className="card-hover border-none shadow-lg bg-card">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#023020]/10 flex items-center justify-center mb-5">
                    <f.icon className="h-7 w-7 text-[#023020]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detail + image */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/mobile-money-detail.jpg" alt="Mobile money" width={700} height={500} className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                Toutes vos operations en un seul endroit
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Que vous souhaitiez envoyer de l{"'"}argent a un proche, payer
                vos factures ou recharger votre telephone, notre service
                monnaie mobile vous offre une solution rapide et fiable.
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  "Disponible 7j/7 et 24h/24",
                  "Compatible avec tous les operateurs",
                  "Historique complet de vos transactions",
                  "Assistance client dediee",
                  "Limites de transfert elevees",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#023020] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-[#023020] hover:bg-[#034a30] text-white">
                <Link href="/contact">
                  En savoir plus <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Operations grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nos operations disponibles
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((op) => (
              <div key={op.title} className="flex items-start gap-4 p-6 rounded-xl bg-card shadow-md card-hover">
                <div className="w-10 h-10 rounded-lg bg-[#D4A373]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-[#D4A373]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{op.title}</h3>
                  <p className="text-muted-foreground text-sm">{op.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#023020]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Simplifiez vos transactions aujourd{"'"}hui
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Rendez-vous dans l{"'"}un de nos points de service ou contactez-nous
            pour commencer a utiliser nos services monnaie mobile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#D4A373] hover:bg-[#c28a52] text-white shadow-lg">
              <Link href="/contact">Nous contacter</Link>
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
