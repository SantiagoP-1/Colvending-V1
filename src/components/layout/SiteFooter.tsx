import Image from "next/image";
import { Mail, MapPin, Clock, Camera, PlayCircle, Music2, type LucideIcon } from "lucide-react";
import logoIcon from "@/assets/images/logo-icon.webp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BRAND, SOCIAL_LINKS } from "@/lib/content";
import { NAV_LINKS } from "@/lib/nav";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Camera,
  youtube: PlayCircle,
  tiktok: Music2,
};

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-white/10 bg-ink-950 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#hero" className="flex items-center gap-2.5" aria-label="ColVending inicio">
              <Image src={logoIcon} alt="" width={26} height={32} className="h-8 w-auto" />
              <span className="font-display text-lg font-semibold tracking-tight text-paper">
                COLVENDING
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              {BRAND.tagline}
              <br />
              {BRAND.addressLines.join(" ")}
            </p>
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-6 px-5 py-2.5 text-[13px]"
            >
              <WhatsAppIcon />
              Consultar ahora
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-paper">Navegación</h3>
            <ul role="list" className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-300 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-paper">Contacto</h3>
            <address className="mt-4 space-y-3.5 text-sm text-ink-300 not-italic">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                <span>
                  {BRAND.addressLines[0]}
                  <br />
                  {BRAND.addressLines[1]}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <WhatsAppIcon className="shrink-0 text-red-500" />
                <a
                  href={whatsappHref(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-red-500" aria-hidden="true" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                <span>
                  {BRAND.hoursLines[0]}
                  <br />
                  {BRAND.hoursLines[1]}
                </span>
              </div>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-paper">Seguinos</h3>
            <ul role="list" className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-paper"
                    >
                      {Icon ? (
                        <Icon size={15} className="shrink-0 text-red-500" aria-hidden="true" />
                      ) : null}
                      {social.platform}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{BRAND.copyright}</p>
          <p>{BRAND.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
