import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  UtensilsCrossed,
  ChefHat,
  Heart,
  PartyPopper,
  Salad,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Service Traiteur - MK GLOBAL SERVICE",
  description:
    "Service traiteur professionnel pour tous vos evenements : mariages, conferences, fetes et ceremonies par MK GLOBAL SERVICE.",
}

const features = [
  { icon: ChefHat, title: "Chefs experimentes", desc: "Nos chefs qualifies preparent des plats raffines avec des techniques culinaires maitrisees." },
  { icon: Salad, title: "Ingredients frais", desc: "Nous selectionnons uniquement des ingredients frais et de premiere qualite pour chaque plat." },
  { icon: PartyPopper, title: "Tous evenements", desc: "Mariages, conferences, anniversaires, cocktails : nous nous adaptons a chaque occasion." },
  { icon: Heart, title: "Menus personnalises", desc: "Des menus sur mesure qui s'adaptent a vos gouts, votre budget et vos contraintes alimentaires." },
  { icon: Truck, title: "Livraison et mise en place", desc: "Service complet incluant la livraison, la mise en place et le service sur place." },
  { icon: UtensilsCrossed, title: "Cuisine variee", desc: "Cuisine africaine traditionnelle, internationale et fusion pour ravir tous les palais." },
]

const menuTypes = [
  {
    title: "Cocktail dinatoire",
    desc: "Une selection de bouchees elegantes et canapes pour vos receptions.",
    items: ["Bouchees salees variees", "Mini-brochettes", "Canapes rafines", "Petits fours sucres"],
  },
  {
    title: "Buffet complet",
    desc: "Un buffet genereux avec entrees, plats et desserts pour satisfaire tous les appetits.",
    items: ["Entrees froides et chaudes", "Plats principaux varies", "Accompagnements", "Desserts et patisseries"],
  },
  {
    title: "Menu a table",
    desc: "Un service a table elegant avec un menu compose pour des evenements prestigieux.",
    items: ["Amuse-bouche", "Entree raffinee", "Plat principal au choix", "Dessert gastronomique"],
  },
]

export default function TraiteurPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/catering.jpg" alt="Service traiteur" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/90 to-[#034a30]/60" />
        </div>
        <div className="container mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm">
            <ChevronLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              <UtensilsCrossed className="h-4 w-4" />
              Service Traiteur
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white text-balance">
              Service traiteur d{"'"}exception
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Faites de chaque evenement un moment inoubliable avec notre
              service traiteur. Des menus personnalises, des ingredients
              frais et un service impeccable pour emerveiller vos invites.
            </p>
            <Button asChild size="lg" className="bg-[#D4A373] hover:bg-[#c28a52] text-white shadow-lg">
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#023020]/10 text-sm font-medium text-[#023020] mb-4">
              Notre promesse
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              L{"'"}excellence culinaire a votre service
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
              <Image src="/images/catering-detail.jpg" alt="Traiteur detail" width={700} height={500} className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                Des saveurs qui marquent les esprits
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Notre service traiteur allie la richesse de la cuisine africaine
                a l{"'"}elegance de la gastronomie internationale. Chaque plat est
                prepare avec passion et un souci du detail qui fait la difference.
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  "Cuisine africaine et internationale",
                  "Options vegetariennes et veganes",
                  "Adaptations aux allergies alimentaires",
                  "Vaisselle et decoration incluses",
                  "Personnel de service professionnel",
                  "Nettoyage apres evenement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-[#023020] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-[#023020] hover:bg-[#034a30] text-white">
                <Link href="/contact">
                  Planifier mon evenement <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu types */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">
              Nos formules traiteur
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez le style de service qui convient le mieux a votre
              evenement. Chaque formule est entierement personnalisable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {menuTypes.map((m) => (
              <Card key={m.title} className="card-hover border-none shadow-lg bg-card">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#D4A373]/10 flex items-center justify-center mb-5">
                    <UtensilsCrossed className="h-7 w-7 text-[#D4A373]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{m.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{m.desc}</p>
                  <ul className="flex flex-col gap-3">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-[#023020] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
          <div className="absolute inset-0 bg-[#023020]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white text-balance">
            Votre evenement merite le meilleur
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Contactez-nous pour discuter de votre prochain evenement. Notre
            equipe se fera un plaisir de creer un menu personnalise qui
            ravira vos invites.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#D4A373] hover:bg-[#c28a52] text-white shadow-lg">
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
