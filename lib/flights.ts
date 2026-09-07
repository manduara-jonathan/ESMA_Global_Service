/**
 * Grille tarifaire des vols ESMA GLOBAL SERVICE.
 * ESMA GLOBAL SERVICE flight fare grid.
 *
 * Tous les vols partent de Kinshasa. Les prix sont exprimés en USD.
 * All flights depart from Kinshasa. Prices are in USD.
 */

export type FlightCategory = "international" | "national"

export interface Flight {
  /** Identifiant unique / unique id */
  id: string
  /** Ville de destination / destination city */
  destination: string
  /** Pays (surtout pour l'international) / country */
  country?: string
  category: FlightCategory
  /** Prix minimum en USD / minimum price in USD */
  priceMin: number
  /** Prix maximum en USD ; égal à priceMin si prix fixe / max price */
  priceMax: number
  /** true si aller-retour (international), false si aller simple (national) */
  roundTrip: boolean
}

export const FLIGHTS: Flight[] = [
  // ------------------------- Vols internationaux -------------------------
  {
    id: "kin-dxb",
    destination: "Dubaï",
    country: "Émirats arabes unis",
    category: "international",
    priceMin: 850,
    priceMax: 1200,
    roundTrip: true,
  },
  {
    id: "kin-dar",
    destination: "Dar-es-Salaam",
    country: "Tanzanie",
    category: "international",
    priceMin: 550,
    priceMax: 700,
    roundTrip: true,
  },
  {
    id: "kin-znz",
    destination: "Zanzibar",
    country: "Tanzanie",
    category: "international",
    priceMin: 750,
    priceMax: 950,
    roundTrip: true,
  },
  {
    id: "kin-par",
    destination: "Paris",
    country: "France",
    category: "international",
    priceMin: 650,
    priceMax: 800,
    roundTrip: true,
  },
  {
    id: "kin-jnb",
    destination: "Johannesburg",
    country: "Afrique du Sud",
    category: "international",
    priceMin: 450,
    priceMax: 600,
    roundTrip: true,
  },
  {
    id: "kin-kgl",
    destination: "Kigali",
    country: "Rwanda",
    category: "international",
    priceMin: 550,
    priceMax: 700,
    roundTrip: true,
  },
  {
    id: "kin-kla",
    destination: "Kampala",
    country: "Ouganda",
    category: "international",
    priceMin: 550,
    priceMax: 700,
    roundTrip: true,
  },

  // --------------------------- Vols nationaux ----------------------------
  {
    id: "kin-fki",
    destination: "Kisangani",
    country: "RDC",
    category: "national",
    priceMin: 230,
    priceMax: 230,
    roundTrip: false,
  },
  {
    id: "kin-fbm",
    destination: "Lubumbashi",
    country: "RDC",
    category: "national",
    priceMin: 250,
    priceMax: 250,
    roundTrip: false,
  },
  {
    id: "kin-bnc",
    destination: "Beni",
    country: "RDC",
    category: "national",
    priceMin: 450,
    priceMax: 450,
    roundTrip: false,
  },
  {
    id: "kin-mjm",
    destination: "Mbuji-Mayi",
    country: "RDC",
    category: "national",
    priceMin: 215,
    priceMax: 215,
    roundTrip: false,
  },
  {
    id: "kin-kga",
    destination: "Kananga",
    country: "RDC",
    category: "national",
    priceMin: 185,
    priceMax: 185,
    roundTrip: false,
  },
  {
    id: "kin-klz",
    destination: "Kolwezi",
    country: "RDC",
    category: "national",
    priceMin: 325,
    priceMax: 325,
    roundTrip: false,
  },
  {
    id: "kin-kle",
    destination: "Kalemie",
    country: "RDC",
    category: "national",
    priceMin: 360,
    priceMax: 360,
    roundTrip: false,
  },
  {
    id: "kin-knd",
    destination: "Kindu",
    country: "RDC",
    category: "national",
    priceMin: 215,
    priceMax: 215,
    roundTrip: false,
  },
]

/** Formate une fourchette de prix en USD ($850 ou $850 – $1,200). */
export function formatPrice(flight: Flight): string {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`
  return flight.priceMin === flight.priceMax
    ? fmt(flight.priceMin)
    : `${fmt(flight.priceMin)} – ${fmt(flight.priceMax)}`
}
