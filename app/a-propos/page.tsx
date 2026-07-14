import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Clock, Users, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/office.jpg"
            alt="Bureau ESMA GLOBAL SERVICE"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b2b2b]/90 to-[#3a3835]/70" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-4 border border-white/20">
                Notre histoire
              </span>
              <h1 className="text-4xl font-bold tracking-tight mb-6 text-balance">
                A propos de ESMA GLOBAL SERVICE
              </h1>
              <p className="text-white/90 mb-6 leading-relaxed">
                Bienvenue chez ESMA GLOBAL SERVICE, votre partenaire de confiance
                pour tous vos besoins en matiere de voyages, services financiers,
                entretien et restauration. Depuis notre creation, nous nous
                efforceons d{"'"}offrir des services de qualite superieure a nos
                clients.
              </p>
              <p className="text-white/80 mb-8 leading-relaxed">
                Notre mission est de simplifier votre quotidien en vous proposant
                une gamme complete de services adaptes a vos besoins specifiques.
              </p>
              <Button
                asChild
                className="bg-[#E8772E] hover:bg-[#d3641d] text-[#2b2b2b] shadow-lg"
              >
                <Link href="/contact">Contactez-nous</Link>
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="/images/team.jpg"
                  alt="Equipe ESMA GLOBAL SERVICE"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              Ce qui nous definit
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nos valeurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nos valeurs fondamentales guident chacune de nos actions et nous
              permettent de vous offrir un service exceptionnel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                desc: "Nous nous efforceons d'atteindre l'excellence dans tous nos services, en veillant a ce que chaque detail soit parfait.",
              },
              {
                icon: Clock,
                title: "Ponctualite",
                desc: "Nous respectons les delais et nous nous engageons a fournir nos services dans les temps impartis.",
              },
              {
                icon: Users,
                title: "Professionnalisme",
                desc: "Notre equipe est composee de professionnels qualifies qui s'engagent a offrir un service de haute qualite.",
              },
              {
                icon: Heart,
                title: "Satisfaction client",
                desc: "La satisfaction de nos clients est notre priorite absolue, et nous nous efforceons de depasser leurs attentes.",
              },
            ].map((item) => (
              <Card key={item.title} className="card-hover border-none shadow-lg bg-card">
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

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              Nos talents
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Notre equipe
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Decouvrez les personnes passionnees qui travaillent chaque jour
              pour vous offrir des services exceptionnels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
{
              name: "NGOY KEMBO MERVEILLE",
              role: "Fondatrice & Directrice",
              desc: "Visionnaire et leader passionnée, guidant l'entreprise vers l'excellence.",
            },
              {
                name: "MANDUARA TSHIMPAKA JONATHAN",
                role: "Responsable Technique",
                desc: "Développeur Web et mobile avec 3 ans d'expérience en réseau et télécommunications. Expert en graphisme, design visuel et marketing pour la plateforme.",
              },
            ].map((member) => (
              <Card key={member.name} className="card-hover border-none shadow-lg bg-card text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm mb-3 font-medium">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
              <Image
                src="/images/office.jpg"
                alt="Notre histoire"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
                Depuis le debut
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-gradient">
                Notre histoire
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  ESMA GLOBAL SERVICE a ete fondee avec une vision claire : offrir
                  des services diversifies et de qualite pour repondre aux besoins
                  varies de nos clients. Ce qui a commence comme une petite agence
                  de voyages s{"'"}est transforme en une entreprise
                  multidisciplinaire.
                </p>
                <p>
                  Au fil des annees, nous avons elargi notre offre pour inclure la
                  facilitation de visas, les services de monnaie mobile, le
                  nettoyage d{"'"}immeubles et le service traiteur.
                </p>
                <p>
                  Aujourd{"'"}hui, nous sommes fiers d{"'"}etre reconnus comme un
                  partenaire de confiance par nos clients et nous continuons a
                  ameliorer nos services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
