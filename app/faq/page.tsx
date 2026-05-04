import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    q: "Comment puis-je reserver un billet d'avion ?",
    a: "Vous pouvez reserver un billet d'avion de plusieurs facons : en nous contactant par telephone, en nous envoyant un email, en utilisant notre formulaire de contact en ligne ou en vous rendant directement a notre bureau. Nous vous proposerons les meilleures options disponibles.",
  },
  {
    q: "Quels types de visas pouvez-vous faciliter ?",
    a: "Nous facilitons l'obtention de differents types de visas, notamment les visas touristiques, d'affaires, d'etudes et de travail pour de nombreux pays. Notre equipe vous guidera dans la preparation de votre dossier.",
  },
  {
    q: "Quels sont vos services de monnaie mobile ?",
    a: "Nos services de monnaie mobile comprennent les transferts d'argent nationaux et internationaux, les paiements de factures, les recharges telephoniques et d'autres services financiers a des tarifs competitifs.",
  },
  {
    q: "Comment fonctionne votre service de nettoyage d'immeubles ?",
    a: "Notre service de nettoyage est personnalise selon vos besoins. Nous proposons des contrats reguliers ou des interventions ponctuelles. Apres une evaluation de vos locaux, nous vous fournissons un devis detaille.",
  },
  {
    q: "Que propose votre service traiteur ?",
    a: "Notre service traiteur propose des menus varies et personnalises pour tous types d'evenements : reunions d'entreprise, mariages, anniversaires, etc. Notre service comprend la preparation, la livraison et la mise en place.",
  },
  {
    q: "Quels sont vos delais de reservation pour le service traiteur ?",
    a: "Nous recommandons de reserver au moins 7 jours a l'avance pour les petits evenements et 2 a 4 semaines pour les grands evenements. Nous faisons notre possible pour accommoder les demandes de derniere minute.",
  },
  {
    q: "Proposez-vous des forfaits pour les entreprises ?",
    a: "Oui, nous proposons des forfaits speciaux pour les entreprises qui combinent plusieurs de nos services. Ces forfaits peuvent etre personnalises selon vos besoins specifiques.",
  },
  {
    q: "Comment puis-je payer pour vos services ?",
    a: "Nous acceptons plusieurs modes de paiement : especes, cartes bancaires, virements bancaires et paiements mobiles. Pour certains services, un acompte peut etre demande a la reservation.",
  },
  {
    q: "Quelle est votre politique d'annulation ?",
    a: "Notre politique d'annulation varie selon le service. Pour les billets d'avion, elle depend des conditions des compagnies aeriennes. Pour le service traiteur, une annulation 48 heures avant peut entrainer des frais.",
  },
  {
    q: "Couvrez-vous toutes les destinations pour les billets d'avion ?",
    a: "Oui, nous proposons des billets d'avion pour pratiquement toutes les destinations nationales et internationales. Nous travaillons avec les principales compagnies aeriennes.",
  },
]

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="FAQ background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/90 to-[#034a30]/70" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-4 border border-white/20">
            Aide
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-white">
            Questions frequemment posees
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
            Trouvez des reponses aux questions les plus courantes concernant nos
            services. Si vous ne trouvez pas ce que vous cherchez, contactez-nous.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team.jpg"
            alt="Contact background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#023020]/85" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">
            Vous avez d{"'"}autres questions ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Si vous n{"'"}avez pas trouve la reponse a votre question, notre
            equipe est a votre disposition pour vous fournir toutes les
            informations dont vous avez besoin.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#D4A373] hover:bg-[#c28a52] text-[#023020] shadow-lg"
          >
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
