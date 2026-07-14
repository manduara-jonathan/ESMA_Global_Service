import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="ESMA Global Service background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b2b2b]/90 via-[#3a3835]/70 to-[#E8772E]/50 z-[1]" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
              Votre partenaire de confiance
            </span>
            <h1 className="text-4xl font-bold tracking-tight mb-6 lg:text-5xl xl:text-6xl text-balance leading-tight">
              Des services{" "}
              <span className="text-[#E8772E]">exceptionnels</span> pour
              tous vos besoins
            </h1>
            <p className="mb-8 text-lg text-white/90 max-w-xl leading-relaxed">
              ESMA GLOBAL SERVICE vous propose une gamme complete de services
              premium : vente de billets d{"'"}avion, facilitation de visas,
              services monnaie mobile, nettoyage d{"'"}immeubles et service
              traiteur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#E8772E] hover:bg-[#d3641d] text-[#2b2b2b] font-semibold shadow-lg shadow-[#E8772E]/25"
              >
                <Link href="/services">Decouvrir nos services</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
              >
                <Link href="/contact">Contactez-nous</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <Image
                src="/images/hero-services.jpg"
                alt="ESMA GLOBAL SERVICE"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(40,33%,98%)] to-transparent z-10" />
    </section>
  )
}
