// Línea COMERCIAL de ColVending (+54 9 223 529 9714). Es la única fuente del
// número: todos los botones (vía whatsappHref) y el JSON-LD de layout.tsx la
// usan. No poner acá números personales.
export const WHATSAPP_NUMBER = "5492235299714";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general:
    "Hola, me interesa conocer más sobre las máquinas expendedoras de ColVending.",
  calculadora:
    "Hola, usé la calculadora de ColVending y quiero más info sobre las máquinas.",
} as const;
