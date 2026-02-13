import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingForm } from "@/components/booking-form"
import {
  Plane,
  Stamp,
  Wallet,
  Sparkles,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react"

const services = [
  {
    icon: Plane,
    title: "Billets d'avion",
    slug: "billets-avion",
    image: "/images/flights.jpg",
    description:
      "Vente de billets d'avion pour toutes les destinations nationales et internationales aux meilleurs tarifs.",
    features: [
      "Reservations de vols nationaux et internationaux",
      "Tarifs preferentiels avec les principales compagnies",
      "Assistance personnalisee pour vos voyages",
    ],
  },
  {
    icon: Stamp,
    title: "Facilitation de visas",
    slug: "visas",
    image: "/images/visas.jpg",
    description:
      "Accompagnement dans toutes les demarches administratives pour l'obtention de visas touristiques et autres.",
    features: [
      "Assistance pour la preparation du dossier",
      "Suivi personnalise de votre demande",
      "Conseils d'experts pour maximiser vos chances",
    ],
  },
  {
    icon: Wallet,
    title: "Services monnaie mobile",
    slug: "monnaie-mobile",
    image: "/images/mobile-money.jpg",
    description:
      "Transactions financieres rapides et securisees via monnaie mobile pour transferts et paiements.",
    features: [
      "Transferts d'argent nationaux et internationaux",
      "Paiements de factures et recharges telephoniques",
      "Frais competitifs et service rapide",
    ],
  },
  {
    icon: Sparkles,
    title: "Service de nettoyage",
    slug: "nettoyage",
    image: "/images/cleaning.jpg",
    description:
      "Entretien professionnel de vos locaux avec des equipements modernes et des produits ecologiques.",
    features: [
      "Nettoyage regulier ou ponctuel de bureaux et immeubles",
      "Personnel qualifie et materiel professionnel",
      "Devis personnalises selon vos besoins",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Service traiteur",
    slug: "traiteur",
    image: "/images/catering.jpg",
    description:
      "Menus varies et personnalises pour tous vos evenements avec des plats prepares par nos chefs.",
    features: [
      "Menus adaptes a tous types d'evenements",
      "Ingredients frais et de qualite",
      "Service complet incluant la mise en place",
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-services.jpg"
            alt="Nos services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021a2e]/90 to-[#0270bd]/70" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-4 border border-white/20">
            Ce que nous offrons
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-white text-balance">
            Nos Services
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Decouvrez notre gamme complete de services professionnels concus
            pour repondre a tous vos besoins, de la planification de voyages
            aux services de restauration.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="flex flex-col card-hover border-none shadow-lg overflow-hidden bg-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-[#0270bd]" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-[#0270bd] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-[#0270bd] hover:bg-[#035999] text-white"
                  >
                    <Link href={`/services/${service.slug}`}>Decouvrir ce service</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
                Reservez un service
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Remplissez le formulaire pour faire une demande de reservation.
                Notre equipe vous contactera dans les plus brefs delais pour confirmer votre demande.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-sm">Choisissez votre service</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <p className="text-sm">Remplissez vos informations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <p className="text-sm">Nous vous contactons pour confirmer</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-card rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Contact direct :</p>
                <p className="font-medium">
                  <a href="tel:+243819145660" className="text-primary hover:underline">+243 819 145 660</a>
                </p>
                <p className="font-medium">
                  <a href="mailto:mkglobalservices01@gmail.com" className="text-primary hover:underline">mkglobalservices01@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="bg-card rounded-2xl shadow-lg p-8 ring-1 ring-border">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Contact background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#021a2e]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Besoin d{"'"}aide ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Contactez-nous directement par telephone ou email pour une assistance immediate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#e0822d] hover:bg-[#d16522] text-white shadow-lg"
            >
              <a href="tel:+243819145660">Appeler maintenant</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <a href="mailto:mkglobalservices01@gmail.com">Envoyer un email</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
