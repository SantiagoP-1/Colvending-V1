import Image from "next/image";
import whatsappLogo from "@/assets/images/logo-whatsapp.webp";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

// The source image is already a solid WhatsApp-green badge (no transparent
// margin), so it becomes the whole button — clipped to a circle — instead
// of sitting inside a separate white background shape.
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a ColVending por WhatsApp"
      title="Hablar por WhatsApp"
      className="group fixed right-6 bottom-6 z-40 h-14 w-14 overflow-hidden rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.45)] transition-transform duration-300 ease-out-soft hover:scale-105"
    >
      <span
        className="absolute inset-0 motion-safe:animate-ping rounded-full bg-[#25D366]/50 group-hover:animate-none"
        aria-hidden="true"
      />
      <Image
        src={whatsappLogo}
        alt=""
        fill
        sizes="56px"
        className="relative object-cover"
      />
    </a>
  );
}
