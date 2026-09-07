import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AsesorChatWidget } from "@/components/ui/AsesorChatWidget";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Catálogo completo — ColVending",
    description:
      "Próximamente vas a poder ver acá todos los modelos disponibles de ColVending.",
    path: "/catalogo",
  }),
  // Placeholder page ("Próximamente..."), no longer linked from anywhere on
  // the site (see content.ts) — keeping it indexable would put thin/"coming
  // soon" content in front of someone searching for ColVending's catalog.
  // follow: true so any link equity still flows through to the rest of the
  // site instead of being trapped on a dead end.
  robots: { index: false, follow: true },
};

export default function CatalogoPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="flex min-h-[100dvh] items-center bg-ink-950 pt-[72px]">
          <Container className="py-24 text-center">
            <p className="mx-auto inline-flex w-fit items-center gap-2 rounded-chip border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
              Catálogo completo ColVending
            </p>
            <h1 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-semibold text-paper sm:text-5xl">
              Próximamente vas a poder ver acá todos los modelos disponibles.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-300">
              Mientras tanto, hablá con un asesor para conocer la Máquina Mixta y el
              resto de las opciones que estamos incorporando.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/#maquinas" variant="primary">
                Ver nuestro modelo
              </Button>
              <Button href="/" variant="ghost">
                Volver al inicio
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
      <AsesorChatWidget />
    </>
  );
}
