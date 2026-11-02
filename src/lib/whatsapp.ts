export const WHATSAPP_NUMBER = "5492266485398";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general:
    "Hola, me interesa conocer más sobre las máquinas expendedoras de ColVending.",
  calculadora:
    "Hola, usé la calculadora de ColVending y quiero más info sobre las máquinas.",
} as const;
