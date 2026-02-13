import Image from "next/image"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/office.jpg"
            alt="Contactez-nous"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021a2e]/90 to-[#0270bd]/70" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-4 border border-white/20">
            Parlons ensemble
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-white">
            Contactez-nous
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
            Vous avez des questions ou besoin d{"'"}informations supplementaires
            sur nos services ? Notre equipe est a votre disposition.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-gradient">
                Informations de contact
              </h2>

              <div className="flex flex-col gap-8">
                {[
                  {
                    icon: Phone,
                    title: "Telephone",
                    lines: ["+243 819 145 660"],
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    lines: ["mkglobalservices01@gmail.com"],
                  },
                  {
                    icon: MapPin,
                    title: "Adresse",
                    lines: ["123 Avenue Principale", "Ville, Pays"],
                  },
                  {
                    icon: Clock,
                    title: "Heures d'ouverture",
                    lines: [
                      "Lundi - Vendredi: 8h00 - 18h00",
                      "Samedi: 9h00 - 15h00",
                      "Dimanche: Ferme",
                    ],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-foreground">
                        {item.title}
                      </h3>
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="text-muted-foreground text-sm"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-semibold text-lg mb-4 text-foreground">
                  Suivez-nous
                </h3>
                <div className="flex gap-3">
                  {["Facebook", "Instagram", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary text-sm font-medium"
                      aria-label={social}
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-gradient">
                Envoyez-nous un message
              </h2>
              <div className="bg-card rounded-2xl shadow-lg p-8 ring-1 ring-border">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
