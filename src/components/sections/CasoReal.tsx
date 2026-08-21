import { CasoRealCase } from "@/components/sections/CasoRealCase";
import matiasPhoto from "@/assets/images/matias-quilmes.jpg";
import { CASO_REAL_CONTENT, UBICACION_PARTICULAR_CONTENT } from "@/lib/content";
import { CASO_REAL_REELS } from "@/lib/reels";

// Two consecutive case studies, one per business niche — see the TODO on
// UBICACION_PARTICULAR_CONTENT in content.ts for what's still pending from
// the client on the first one.
export function CasoReal() {
  return (
    <>
      <CasoRealCase
        sectionId={UBICACION_PARTICULAR_CONTENT.sectionId}
        ariaLabel={UBICACION_PARTICULAR_CONTENT.ariaLabel}
        tag={UBICACION_PARTICULAR_CONTENT.tag}
        nicheLabel={UBICACION_PARTICULAR_CONTENT.nicheLabel}
        heading={UBICACION_PARTICULAR_CONTENT.heading}
        storeName={UBICACION_PARTICULAR_CONTENT.storeName}
        location={UBICACION_PARTICULAR_CONTENT.location}
        body={UBICACION_PARTICULAR_CONTENT.body}
        ctaQuestion={UBICACION_PARTICULAR_CONTENT.ctaQuestion}
        ctaLabel={UBICACION_PARTICULAR_CONTENT.ctaLabel}
        photo={{ src: matiasPhoto, alt: UBICACION_PARTICULAR_CONTENT.photoAlt }}
        audioPlaceholder={UBICACION_PARTICULAR_CONTENT.audioPlaceholder}
      />
      <CasoRealCase
        sectionId={CASO_REAL_CONTENT.sectionId}
        ariaLabel={CASO_REAL_CONTENT.ariaLabel}
        tag={CASO_REAL_CONTENT.tag}
        nicheLabel={CASO_REAL_CONTENT.nicheLabel}
        heading={CASO_REAL_CONTENT.heading}
        subtitle={CASO_REAL_CONTENT.subtitle}
        storeName={CASO_REAL_CONTENT.storeName}
        location={CASO_REAL_CONTENT.location}
        locationHref={CASO_REAL_CONTENT.locationHref}
        quote={`${CASO_REAL_CONTENT.storeTagline}. ${CASO_REAL_CONTENT.storeSlogan}`}
        body={CASO_REAL_CONTENT.body}
        ctaQuestion={CASO_REAL_CONTENT.ctaQuestion}
        ctaLabel={CASO_REAL_CONTENT.ctaLabel}
        socials={CASO_REAL_CONTENT.socials}
        stat={CASO_REAL_CONTENT.followers}
        reels={CASO_REAL_REELS}
      />
    </>
  );
}
