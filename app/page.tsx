import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Plane,
  Wallet,
  Sparkles,
  UtensilsCrossed,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Stamp,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { ContactForm } from "@/components/contact-form"

const services = [
  {
    id: "billets",
    title: "Billets d'avion nationaux et internationaux",
    description:
      "Nous proposons des billets d'avion pour toutes les destinations nationales et internationales aux meilleurs tarifs.",
    image: "/images/flights.jpg",
    features: [
      "Reservations de vols nationaux et internationaux",
      "Tarifs preferentiels avec les principales compagnies aeriennes",
      "Assistance personnalisee pour vos voyages",
    ],
    cta: "Reserver un billet",
    href: "/services/billets-avion",
  },
  {
    id: "visas",
    title: "Facilitation de visas touristiques",
    description:
      "Notre service de facilitation de visas vous accompagne dans toutes les demarches administratives.",
    image: "/images/visas.jpg",
    features: [
      "Assistance pour la preparation de votre dossier",
      "Suivi personnalise de votre demande",
      "Conseils d'experts pour maximiser vos chances",
    ],
    cta: "Demander un visa",
    href: "/services/visas",
  },
  {
    id: "monnaie",
    title: "Services monnaie mobile",
    description:
      "Nos services de monnaie mobile vous permettent d'effectuer des transactions financieres rapidement et en toute securite.",
    image: "/images/mobile-money.jpg",
    features: [
      "Transferts d'argent nationaux et internationaux",
      "Paiements de factures et recharges telephoniques",
      "Frais competitifs et service rapide",
    ],
    cta: "En savoir plus",
    href: "/services/monnaie-mobile",
  },
  {
    id: "nettoyage",
    title: "Service de nettoyage d'immeubles",
    description:
      "Notre equipe de professionnels assure l'entretien de vos locaux avec des equipements modernes.",
    image: "/images/cleaning.jpg",
    features: [
      "Nettoyage regulier ou ponctuel de bureaux et immeubles",
      "Personnel qualifie et materiel professionnel",
      "Devis personnalises selon vos besoins",
    ],
    cta: "Demander un devis",
    href: "/services/nettoyage",
  },
  {
    id: "traiteur",
    title: "Service traiteur",
    description:
      "Notre service traiteur propose des menus varies et personnalises pour tous vos evenements.",
    image: "/images/catering.jpg",
    features: [
      "Menus adaptes a tous types d'evenements",
      "Ingredients frais et de qualite",
      "Service complet incluant la mise en place",
    ],
    cta: "Commander",
    href: "/services/traiteur",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              Nos Services
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Des solutions pour chaque besoin
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Decouvrez notre gamme complete de services professionnels concus
              pour repondre a tous vos besoins.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="flex flex-col gap-4 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <ChevronRight className="h-4 w-4" />
                        </span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                  >
                    <Link href={service.href}>{service.cta}</Link>
                  </Button>
                </div>
                <div
                  className={`relative group ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      loading="lazy"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              Nos avantages
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Pourquoi nous choisir
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ESMA GLOBAL SERVICE s{"'"}engage a offrir des services de qualite
              superieure avec une attention particuliere aux details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Fiabilite",
                desc: "Service garanti avec un engagement total envers la satisfaction de nos clients.",
              },
              {
                icon: Clock,
                title: "Rapidite",
                desc: "Des delais de traitement rapides pour tous nos services, sans compromis sur la qualite.",
              },
              {
                icon: Users,
                title: "Expertise",
                desc: "Une equipe de professionnels qualifies avec des annees d'experience dans chaque domaine.",
              },
              {
                icon: Wallet,
                title: "Tarifs competitifs",
                desc: "Des prix justes et transparents pour tous nos services, avec un excellent rapport qualite-prix.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="card-hover border-none shadow-lg bg-card"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background" id="contact">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
                Contact
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-gradient">
                Contactez-nous
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Vous avez des questions ou besoin d{"'"}informations
                supplementaires sur nos services ? N{"'"}hesitez pas a nous
                contacter.
              </p>

              <div className="flex flex-col gap-8">
                {[
                  {
                    icon: Phone,
                    title: "Téléphone",
                    value: "+243 819 145 660",
                    link: "https://wa.me/243819145660",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    value: "esmaglobaleservices@gmail.com",
                    link: "mailto:esmaglobaleservices@gmail.com",
                  },
                  {
                    icon: MapPin,
                    title: "Adresse",
                    value: "123 Avenue Principale, Ville, Pays",
                    link: null,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a href={item.link} className="text-muted-foreground hover:text-primary hover:underline transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-card rounded-2xl shadow-xl p-8 ring-1 ring-border">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
