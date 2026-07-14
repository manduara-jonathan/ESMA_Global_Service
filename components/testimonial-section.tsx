import { Card, CardContent } from "@/components/ui/card"
import { Star, Users } from "lucide-react"

const testimonials = [
  {
    text: "J'ai utilise les services de ESMA GLOBAL SERVICE pour l'organisation de mon voyage d'affaires. Leur equipe a ete tres professionnelle et reactive. Je recommande vivement.",
    name: "Jean Dupont",
    role: "Entrepreneur",
  },
  {
    text: "Le service traiteur de ESMA GLOBAL SERVICE a ete exceptionnel pour notre evenement d'entreprise. Les plats etaient delicieux et le service impeccable.",
    name: "Marie Martin",
    role: "Directrice marketing",
  },
  {
    text: "Grace a ESMA GLOBAL SERVICE, j'ai pu obtenir mon visa rapidement et sans stress. Leur equipe m'a guide tout au long du processus. Je les recommande sans hesitation.",
    name: "Pierre Dubois",
    role: "Ingenieur",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
            Temoignages
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Decouvrez les temoignages de nos clients satisfaits qui ont
            beneficie de nos services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="card-hover border-none shadow-lg bg-card"
            >
              <CardContent className="pt-6">
                <div className="flex mb-4 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#E8772E] fill-[#E8772E]"
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground text-sm leading-relaxed italic">
                  {`"${t.text}"`}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {t.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
