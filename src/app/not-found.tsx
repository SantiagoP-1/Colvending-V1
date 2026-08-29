import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

const TITLE = "Página no encontrada — ColVending";
const DESCRIPTION =
  "La página que buscás no existe o fue movida. Volvé al inicio de ColVending, máquinas expendedoras automáticas en Balcarce, Buenos Aires.";

// Next.js already injects <meta name="robots" content="noindex"> on any
// response that returns a 404 status, but this route still inherits the
// root layout's `metadata` export by default (title/description/canonical/
// openGraph/twitter) since not-found.tsx renders inside that layout. Left
// alone, that means a link-rot page would carry the *homepage's* canonical
// URL and Open Graph card — telling crawlers "this 404 is the homepage".
// Next's metadata merging replaces a field wholesale the moment a segment
// defines it (verified against a production build — see lib/seo.ts), so
// explicitly setting robots/alternates/openGraph/twitter here breaks that
// inheritance instead of silently carrying it over.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  // Empty on purpose: a 404 has no canonical URL of its own to claim, so
  // this suppresses the inherited "/" rather than pointing one here.
  alternates: {},
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="flex min-h-[100dvh] items-center bg-ink-950 pt-[72px]">
          <Container className="py-24 text-center">
            <p className="mx-auto inline-flex w-fit items-center gap-2 rounded-chip border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
              Error 404
            </p>
            <h1 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-semibold text-paper sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-300">
              La página que buscás no existe o fue movida. Puede que el enlace esté
              roto o que hayas escrito mal la dirección.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" variant="primary">
                Volver al inicio
              </Button>
              <Button
                href={whatsappHref(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                <WhatsAppIcon />
                Hablar con un asesor
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
