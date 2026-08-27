"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Expand } from "lucide-react";
import logistica1 from "@/assets/images/fabrica-china/logistica-1.jpg";
import logistica2 from "@/assets/images/fabrica-china/logistica-2.jpg";
import logistica3 from "@/assets/images/fabrica-china/logistica-3.jpg";
import planta1 from "@/assets/images/fabrica-china/planta-1.jpg";
import planta2 from "@/assets/images/fabrica-china/planta-2.jpg";
import planta3 from "@/assets/images/fabrica-china/planta-3.jpg";
import planta4 from "@/assets/images/fabrica-china/planta-4.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { FABRICA_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

type Photo = { src: StaticImageData; alt: string; caption: string };

// TODO: fotos extraídas del PDF de referencia del cliente (capturas de
// pantalla), no archivos de producción — reemplazar por las fotos/video
// reales apenas el cliente los envíe (ver roadmap de correcciones).
const PLANTA_PHOTOS: Photo[] = [
  {
    src: planta1,
    alt: "Fila de máquinas expendedoras rojas terminadas en la planta de producción",
    caption: "Máquinas terminadas, listas para despacho",
  },
  {
    src: planta2,
    alt: "Máquinas embaladas en la planta, listas para su despacho",
    caption: "Equipos embalados esperando su envío",
  },
  {
    src: planta3,
    alt: "Fila de máquinas expendedoras ColVending negras en la línea de producción",
    caption: "Línea de producción con la marca ColVending",
  },
  {
    src: planta4,
    alt: "Fila de máquinas expendedoras con la marca Punto Ya en la línea de producción",
    caption: "Máquinas personalizadas con la marca Punto Ya",
  },
];

const LOGISTICA_PHOTOS: Photo[] = [
  {
    src: logistica1,
    alt: "Operarios envolviendo una máquina en espuma protectora para su embalaje",
    caption: "Empaquetado manual de cada equipo",
  },
  {
    src: logistica2,
    alt: "Máquinas embaladas cargadas dentro de un contenedor de exportación",
    caption: "Carga de las máquinas en el contenedor",
  },
  {
    src: logistica3,
    alt: "Operario cargando una máquina embalada en un camión con zorra hidráulica",
    caption: "Despacho hacia el puerto para su exportación",
  },
];

function PhotoGrid({
  photos,
  cols,
  onSelect,
}: {
  photos: Photo[];
  cols: "sm:grid-cols-2" | "sm:grid-cols-3";
  onSelect: (photo: Photo) => void;
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${cols}`}>
      {photos.map((photo) => (
        <button
          key={photo.src.src}
          type="button"
          onClick={() => onSelect(photo)}
          aria-label={`Ampliar foto: ${photo.caption}`}
          className="group relative aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-card border border-white/10 text-left"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 text-xs font-medium text-paper">
              <Expand size={13} aria-hidden="true" />
              {photo.caption}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function FabricacionGaleria() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  return (
    <section
      aria-label={FABRICA_CONTENT.ariaLabel}
      className="bg-ink-950 pt-[calc(72px+var(--spacing-section))] pb-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{FABRICA_CONTENT.tag}</SectionTag>
          <h1 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {FABRICA_CONTENT.pageHeading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {FABRICA_CONTENT.pageLead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <PhotoGrid
            photos={PLANTA_PHOTOS}
            cols="sm:grid-cols-2"
            onSelect={setLightboxPhoto}
          />
          <p className="mt-3 text-xs text-ink-400">
            {FABRICA_CONTENT.plantaCaption}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-14">
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-300">
            {FABRICA_CONTENT.logisticaLead}
          </p>
          <div className="mt-6">
            <PhotoGrid
              photos={LOGISTICA_PHOTOS}
              cols="sm:grid-cols-3"
              onSelect={setLightboxPhoto}
            />
          </div>
          <p className="mt-3 text-xs text-ink-400">
            {FABRICA_CONTENT.logisticaCaption}
          </p>
        </Reveal>

        <Reveal
          delay={0.22}
          className="mt-16 flex flex-col items-center gap-6 rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 text-center sm:p-10"
        >
          <p className="max-w-md text-lg font-semibold text-paper">
            {FABRICA_CONTENT.pageCtaQuestion}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <WhatsAppIcon />
              {FABRICA_CONTENT.pageCtaLabel}
            </Button>
            <Button href="/" variant="ghost">
              Volver al inicio
            </Button>
          </div>
        </Reveal>
      </Container>

      <Modal
        open={lightboxPhoto !== null}
        onClose={() => setLightboxPhoto(null)}
        title={lightboxPhoto?.caption ?? "Foto"}
        size="lg"
      >
        {lightboxPhoto && (
          <>
            {/* mt-8 clears the Modal's absolutely-positioned close button
                (top-4 right-4, 36px) — without it, an edge-to-edge image
                sits directly under the button's top-right corner. */}
            <div className="relative mt-8 aspect-4/3 w-full overflow-hidden rounded-btn">
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                fill
                sizes="(min-width: 640px) 700px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 pr-8 text-sm font-medium text-paper">
              {lightboxPhoto.caption}
            </p>
          </>
        )}
      </Modal>
    </section>
  );
}
