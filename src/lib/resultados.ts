// Resultados reales de un local en operación, para el sub-bloque dentro de
// "Retorno de inversión". Actualización manual, una vez por mes — no hay
// fetch ni integración con ninguna planilla, así que este archivo es la
// única fuente de verdad. Para actualizar: reemplazar los 4 `value` /
// `changePercent` de abajo con los datos del mes, y `updatedLabel`.
export type ResultadoMetric = {
  id: string;
  label: string;
  /** Valor grande a mostrar, ya formateado (igual que los stats de ROI). */
  value: string;
  /** Variación firmada vs. el mes anterior — el signo decide la flecha. */
  changePercent: number;
  /** "%" (default) para ingresos/gastos/ganancia, "pts" para margen. */
  changeUnit?: "%" | "pts";
  /** true si un valor MÁS ALTO es una buena noticia (falso para Gastos). */
  higherIsBetter: boolean;
};

export const RESULTADOS_CONTENT = {
  heading: "Caso real: resultados de un local en operación",
  lead: "Cifras de un local real en funcionamiento, comparadas con el mes anterior.",
  updatedLabel: "Actualizado: julio 2026",
  metrics: [
    {
      id: "ingresos",
      label: "Ingresos (mes)",
      value: "$30.250.432",
      changePercent: 21.9,
      higherIsBetter: true,
    },
    {
      id: "gastos",
      label: "Gastos (mes)",
      value: "$21.661.004",
      changePercent: 7.3,
      higherIsBetter: false, // un gasto que SUBE es una mala noticia
    },
    {
      id: "ganancia",
      label: "Ganancia neta (mes)",
      value: "$8.589.428",
      changePercent: 85.2,
      higherIsBetter: true,
    },
    {
      id: "margen",
      label: "Margen neto (mes)",
      value: "28.4%",
      changePercent: 9.7,
      changeUnit: "pts",
      higherIsBetter: true,
    },
  ] satisfies ResultadoMetric[],
} as const;
