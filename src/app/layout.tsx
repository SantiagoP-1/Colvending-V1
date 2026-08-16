import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TapRipple } from "@/components/ui/TapRipple";
import { BRAND, SOCIAL_LINKS } from "@/lib/content";
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

const TITLE =
  "ColVending — Máquinas Expendedoras Automáticas | Balcarce, Buenos Aires";
const DESCRIPTION =
  "Invertí en máquinas expendedoras automáticas. Generá ingresos las 24 horas sin empleados, con monitoreo remoto desde tu celular. ColVending, Balcarce, Buenos Aires.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
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

// LocalBusiness subsumes Organization in schema.org's hierarchy, so one
// node carries both the brand identity (name, logo, sameAs) and the
// local-business specifics (address, phone, hours) instead of two
// competing entities describing the same company.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
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
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  sameAs: SOCIAL_LINKS.map((social) => social.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${bricolage.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <CustomCursor />
        <TapRipple />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
