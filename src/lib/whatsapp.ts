export const WHATSAPP_NUMBER = "5492235299714";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general:
    "Hola, me interesa conocer más sobre las máquinas expendedoras de ColVending.",
} as const;
