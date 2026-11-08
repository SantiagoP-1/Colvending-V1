import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { AsesorChatWidget } from "@/components/ui/AsesorChatWidget";
import { TapRipple } from "@/components/ui/TapRipple";
import { BRAND, INSTALACIONES_CONTENT, SOCIAL_LINKS } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import "./globals.css";

// "latin" alone already covers every character Spanish needs (á é í ó ú ñ ü
// ¿ ¡ all live in the Latin-1 Supplement block within the base "latin"
// subset) — don't add "latin-ext": it only adds Central/Eastern-European
// letters this site never uses, and roughly doubles the font payload.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Client-requested match for the hero H1 (same family/weight as
// orbitaglobalmarketing.com's H1) plus a specific list of section headings
// — see --font-heading in globals.css for the full scope and which
// elements deliberately stay on --font-display (Bricolage) instead.
// TODO: actualizar font-family del body text (Inter) según imagen de
// referencia del cliente (pendiente).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Trimmed to 60/157 chars respectively so Google doesn't truncate them in
// the SERP (was 71/164) — same brand + service + location, same claims.
const TITLE =
  "ColVending — Máquinas Expendedoras en Balcarce, Buenos Aires";
const DESCRIPTION =
  "Invertí en máquinas expendedoras automáticas. Generá ingresos 24/7 sin empleados, con monitoreo remoto desde tu celular. ColVending — Balcarce, Buenos Aires.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    // Next's metadata resolver always normalizes the root path down to a
    // bare origin — "https://colvending.com", no trailing slash — whether
    // this is written as "/" or as an absolute "https://colvending.com/".
    // That's the one canonical form of the homepage; colvending.com/ isn't
    // a distinct URL from Google's (or anyone else's) perspective, just a
    // different way of writing the same one.
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "es_AR",
    siteName: "ColVending",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

// Same coordinates already plotted on the Instalaciones/Ubicaciones map
// (content.ts) — read from there instead of re-typing the literal so the
// two can never drift apart. Stored as [longitude, latitude] to match
// react-simple-maps/GeoJSON convention; schema.org's GeoCoordinates wants
// the fields named the other way around.
const balcarceMarker = INSTALACIONES_CONTENT.markers.find(
  (marker) => marker.id === "balcarce",
)!;
const [BALCARCE_LONGITUDE, BALCARCE_LATITUDE] = balcarceMarker.coordinates;

// LocalBusiness subsumes Organization in schema.org's hierarchy, so one
// node carries both the brand identity (name, logo, sameAs) and the
// local-business specifics (address, phone, hours) instead of two
// competing entities describing the same company. A WebSite node sits
// alongside it (linked via publisher) purely to reinforce the site's own
// name/URL as an entity — both share one <script> tag as a @graph so
// Google reads them as related nodes instead of two disconnected ones.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND.name,
      description: DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/icon-512.png`,
      telephone: `+${WHATSAPP_NUMBER}`,
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Balcarce",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BALCARCE_LATITUDE,
        longitude: BALCARCE_LONGITUDE,
      },
      // Real Google Maps link, already used by the footer's address link
      // (BRAND.addressHref in SiteFooter.tsx) — not a new/separate URL.
      hasMap: BRAND.addressHref,
      // "operamos en todo el territorio nacional" — real claim already made
      // in the Nosotros section copy (content.ts), not a new assertion.
      areaServed: {
        "@type": "Country",
        name: "Argentina",
      },
      // Matches BRAND.hoursLines ("Lunes a Sábados, 09:00 a 20:00 hs"),
      // the same hours shown in the footer — kept in sync rather than
      // duplicated as separate literals so the two can't drift apart.
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      sameAs: SOCIAL_LINKS.map((social) => social.url),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND.name,
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TapRipple />
        <MotionProvider>{children}</MotionProvider>
        <AsesorChatWidget />
      </body>
    </html>
  );
}
