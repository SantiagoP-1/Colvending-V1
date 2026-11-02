// Datos y cálculo de la calculadora de rentabilidad (/calculadora y la
// tarjeta del home). Portado de la calculadora HTML que mandó el cliente
// (calculadora-colvending.html) — mismos números y misma fórmula, para que
// el resultado coincida con la propuesta comercial 2026.
//
// Actualización manual: el dólar de referencia y su fecha, el IVA y los
// precios de cada forma de pago salen de la propuesta comercial vigente
// (public/propuesta-colvending.pdf). Si cambia la propuesta, se actualizan
// acá y nada más.

export const DOLAR = { valor: 1540, fuente: "Banco Nación, venta", fecha: "20/10/2026" } as const;
export const IVA = 0.105;

export type PagoId = "contado" | "saldo" | "cuotas";

export type Pago = {
  id: PagoId;
  nombre: string;
  detalle: string;
  /** Precio final en USD + IVA con esta forma de pago. */
  precio: number;
  /** Precio de lista tachado, si hay descuento. */
  lista?: number;
  badge?: string;
  /** Resumen corto para el bloque "Tu inversión". */
  resumen: string;
  /** Cronograma de pagos en USD + IVA, por máquina. */
  plan: [string, number][];
};

export const PAGOS: Pago[] = [
  {
    id: "contado",
    nombre: "Contado",
    detalle: "Pago total al confirmar · 10% de descuento",
    precio: 5850,
    lista: 6500,
    badge: "10% OFF",
    resumen: "Contado (10% de descuento)",
    plan: [["Pago al confirmar", 5850]],
  },
  {
    id: "saldo",
    nombre: "Anticipo + saldo contra entrega",
    detalle:
      "50% al confirmar: USD 3.250 · saldo de contado contra entrega con 10% de descuento: USD 2.925",
    precio: 6175,
    lista: 6500,
    badge: "10% OFF EN EL SALDO",
    resumen: "Anticipo + saldo contra entrega",
    plan: [
      ["Anticipo 50% al confirmar", 3250],
      ["Saldo de contado contra entrega (10% off)", 2925],
    ],
  },
  {
    id: "cuotas",
    nombre: "Anticipo + 4 cuotas sin interés",
    detalle: "50% al confirmar: USD 3.250 · 4 cuotas de USD 812,50",
    precio: 6500,
    resumen: "Anticipo + 4 cuotas sin interés",
    plan: [
      ["Anticipo 50% al confirmar", 3250],
      ["4 cuotas sin interés de", 812.5],
    ],
  },
];

// Casos reales de la plataforma de control remoto (los mismos de la
// propuesta comercial, pág. "Retorno de inversión documentado"):
// facturación y costo de mercadería por mes, en pesos.
export type Caso = { id: string; nombre: string; ing: number; cost: number };

export const CASOS: Caso[] = [
  { id: "clinica", nombre: "Clínica (Quilmes)", ing: 5935000, cost: 2781051 },
  { id: "colegio", nombre: "Colegio (Luján)", ing: 5634500, cost: 3051288 },
  { id: "utn", nombre: "Universidad UTN (Trenque Lauquen)", ing: 2586308, cost: 975676 },
  { id: "secundaria", nombre: "Escuela secundaria (Buenos Aires)", ing: 2001500, cost: 976596 },
  { id: "univ", nombre: "Universidad (Buenos Aires)", ing: 1794000, cost: 575800 },
];

export type CalcInput = {
  pago: PagoId;
  cant: number;
  flete: number;
  ventas: number;
  ticket: number;
  dias: number;
  margen: number;
  alq: number;
  luz: number;
};

export const DEFAULT_TICKET = 3040;
export const DEFAULT_DIAS = 30;

export function margenDeCaso(c: Caso): number {
  return Math.round((1 - c.cost / c.ing) * 100);
}

/** Ventas por día que reproducen la facturación del caso con ese ticket. */
export function ventasDeCaso(c: Caso, ticket: number, dias: number): number {
  return Math.round(c.ing / (dias || DEFAULT_DIAS) / (ticket || DEFAULT_TICKET));
}

export function calcular(i: CalcInput) {
  const cant = Math.max(1, Math.round(i.cant));
  const pago = PAGOS.find((p) => p.id === i.pago) ?? PAGOS[0];
  const usdTotal = pago.precio * cant * (1 + IVA);
  const inversion = usdTotal * DOLAR.valor + i.flete;

  const factU = i.ventas * i.ticket * i.dias;
  const mercaderiaU = factU * (1 - i.margen / 100);
  const fijosU = i.alq + i.luz;
  const netaU = factU - mercaderiaU - fijosU;
  const neta = netaU * cant;

  return {
    cant,
    pago,
    usdTotal,
    inversion,
    factura: factU * cant,
    mercaderia: mercaderiaU * cant,
    fijos: fijosU * cant,
    netaU,
    neta,
    roi: inversion > 0 ? neta / inversion : 0,
    recupero: neta > 0 ? inversion / neta : Infinity,
    anio1: neta * 12 - inversion,
    anio3: neta * 36 - inversion,
  };
}

// Punto de partida: el caso de la clínica, pago contado, una máquina.
const casoInicial = CASOS[0];
export const DEFAULT_INPUT: CalcInput = {
  pago: "contado",
  cant: 1,
  flete: 0,
  ventas: ventasDeCaso(casoInicial, DEFAULT_TICKET, DEFAULT_DIAS),
  ticket: DEFAULT_TICKET,
  dias: DEFAULT_DIAS,
  margen: margenDeCaso(casoInicial),
  alq: 0,
  luz: 45000,
};
export const DEFAULT_CASO_ID = casoInicial.id;

// ---- Formato (es-AR) ----
export const fmtARS = (n: number) =>
  (n < 0 ? "–$" : "$") + Math.round(Math.abs(n)).toLocaleString("es-AR");

export const fmtARSCorto = (n: number) => {
  const a = Math.abs(n);
  if (a >= 1e6)
    return (n < 0 ? "–$" : "$") + (a / 1e6).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " M";
  return fmtARS(n);
};

export const fmtUSD = (n: number) =>
  "USD " + n.toLocaleString("es-AR", { maximumFractionDigits: 2 });

export const fmtMeses = (n: number) =>
  isFinite(n) ? n.toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " meses" : "No recupera";

export const fmtPct = (n: number) =>
  (n * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + " %";
