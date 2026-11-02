"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  CASOS,
  DEFAULT_CASO_ID,
  DEFAULT_INPUT,
  DOLAR,
  PAGOS,
  calcular,
  fmtARS,
  fmtARSCorto,
  fmtMeses,
  fmtPct,
  fmtUSD,
  margenDeCaso,
  ventasDeCaso,
  type CalcInput,
  type PagoId,
} from "@/lib/calculadora";
import { CALCULADORA_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";

// Inputs are kept as strings so a field can be emptied while typing; they
// are parsed (and clamped to >= 0) only for the math.
type NumField = Exclude<keyof CalcInput, "pago">;
type Form = Record<NumField, string> & { pago: PagoId; ubic: string };

const toForm = (i: CalcInput, ubic: string): Form => ({
  pago: i.pago,
  ubic,
  cant: String(i.cant),
  flete: String(i.flete),
  ventas: String(i.ventas),
  ticket: String(i.ticket),
  dias: String(i.dias),
  margen: String(i.margen),
  alq: String(i.alq),
  luz: String(i.luz),
});

const num = (s: string) => {
  const v = parseFloat(s);
  return isFinite(v) ? Math.max(0, v) : 0;
};

function toInput(f: Form): CalcInput {
  return {
    pago: f.pago,
    cant: num(f.cant),
    flete: num(f.flete),
    ventas: num(f.ventas),
    ticket: num(f.ticket),
    dias: num(f.dias),
    margen: num(f.margen),
    alq: num(f.alq),
    luz: num(f.luz),
  };
}

function aplicarCaso(f: Form, id: string): Form {
  const c = CASOS.find((x) => x.id === id);
  if (!c) return { ...f, ubic: "otro" };
  return {
    ...f,
    ubic: id,
    ventas: String(ventasDeCaso(c, num(f.ticket), num(f.dias))),
    margen: String(margenDeCaso(c)),
  };
}

const inputClasses =
  "w-full rounded-btn border border-white/10 bg-black/30 px-3.5 py-2.5 text-[15px] text-paper tabular-nums transition-colors hover:border-white/20 focus-visible:border-red-500 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-500/25";

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-white/10 py-5 first-of-type:border-t-0 first-of-type:pt-2">
      <h3 className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] text-red-400 uppercase">
        <span className="font-display text-ink-400">{n}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  onBlur,
  step = 1,
  min = 0,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="grid gap-1.5 text-[13.5px] font-medium text-ink-200">
      {label}
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={inputClasses}
      />
    </label>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="grid gap-1.5 text-[13.5px] font-medium text-ink-200">
      {label}
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-1.5 w-full cursor-pointer accent-red-500"
        />
        <output htmlFor={id} className="font-display min-w-[5ch] text-right font-semibold text-paper tabular-nums">
          {value}
          {suffix}
        </output>
      </div>
    </label>
  );
}

// Ganancia bruta acumulada (línea) contra la inversión (referencia
// punteada) en 24 meses, con el punto de recupero marcado. Hover/touch
// muestra el acumulado de cada mes; el detalle numérico completo está en la
// tabla "Cómo se arma el número", que funciona como vista de tabla.
function RecuperoChart({ inversion, neta }: { inversion: number; neta: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [small, setSmall] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSmall(e.contentRect.width < 480));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const M = 24;
  const W = 640;
  const H = small ? 340 : 280;
  const L = small ? 104 : 64;
  const R = 14;
  const T = 14;
  const B = small ? 44 : 34;
  const FS = small ? 20 : 11;

  const pts = Array.from({ length: M + 1 }, (_, i) => neta * i);
  const maxY = Math.max(inversion, ...pts, 1) * 1.08;
  const minY = Math.min(0, ...pts);
  const x = (i: number) => L + ((W - L - R) * i) / M;
  const y = (v: number) => T + (H - T - B) * (1 - (v - minY) / (maxY - minY));
  const path = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const rec = neta > 0 ? inversion / neta : Infinity;

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - box.left) / box.width) * W;
    const i = Math.round(((sx - L) / (W - L - R)) * M);
    setHover(Math.min(M, Math.max(0, i)));
  }

  const hx = hover !== null ? x(hover) : 0;
  const tipW = small ? 300 : 190;
  const tipX = Math.min(Math.max(hx - tipW / 2, L), W - R - tipW);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Ganancia bruta acumulada contra inversión en 24 meses. ${
        isFinite(rec) && rec <= M ? `Recupera la inversión en el mes ${rec.toFixed(1)}.` : "No recupera en 24 meses."
      }`}
      className="block h-auto w-full touch-none select-none"
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={() => setHover(null)}
    >
      <defs>
        <linearGradient id="calc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d72638" stopOpacity=".3" />
          <stop offset="1" stopColor="#d72638" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((k) => {
        const v = minY + ((maxY - minY) * k) / 4;
        return (
          <g key={k}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,.07)" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize={FS} fill="#98989f">
              {fmtARSCorto(v)}
            </text>
          </g>
        );
      })}
      {[0, 6, 12, 18, 24].map((i) => (
        <text
          key={i}
          x={x(i)}
          y={H - 12}
          textAnchor={i === 0 ? "start" : i === M ? "end" : "middle"}
          fontSize={FS}
          fill="#98989f"
        >
          {i === 0 ? "Hoy" : `Mes ${i}`}
        </text>
      ))}
      <line
        x1={L}
        x2={W - R}
        y1={y(inversion)}
        y2={y(inversion)}
        stroke="#98989f"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <path d={`${path} L${x(M)},${y(minY)} L${x(0)},${y(minY)} Z`} fill="url(#calc-area)" />
      <path d={path} fill="none" stroke="#d72638" strokeWidth={2.5} strokeLinejoin="round" />
      {isFinite(rec) && rec <= M && (
        <>
          <circle cx={x(rec)} cy={y(inversion)} r={6} fill="#f5f5f4" stroke="#d72638" strokeWidth={3} />
          {/* Zonas que la curva nunca toca: a la derecha del punto, debajo de
              la línea de inversión (la curva ya la cruzó hacia arriba); a la
              izquierda, encima (la curva todavía no llegó). */}
          <text
            x={x(rec) < W / 2 ? x(rec) + 12 : x(rec) - 12}
            y={x(rec) < W / 2 ? y(inversion) + (small ? 30 : 20) : y(inversion) - (small ? 14 : 10)}
            textAnchor={x(rec) < W / 2 ? "start" : "end"}
            fontSize={small ? 20 : 12}
            fontWeight={600}
            fill="#f5f5f4"
          >
            Recuperás la inversión · mes {rec.toLocaleString("es-AR", { maximumFractionDigits: 1 })}
          </text>
        </>
      )}
      {hover !== null && (
        <g pointerEvents="none">
          <line x1={hx} x2={hx} y1={T} y2={H - B} stroke="rgba(255,255,255,.35)" />
          <circle cx={hx} cy={y(pts[hover])} r={5} fill="#d72638" stroke="#111113" strokeWidth={2} />
          <rect x={tipX} y={T} width={tipW} height={small ? 62 : 40} rx={8} fill="#1c1c21" stroke="rgba(255,255,255,.15)" />
          <text x={tipX + 10} y={T + (small ? 26 : 16)} fontSize={small ? 18 : 11} fill="#98989f">
            {hover === 0 ? "Hoy" : `Mes ${hover}`} · acumulado
          </text>
          <text x={tipX + 10} y={T + (small ? 52 : 32)} fontSize={small ? 20 : 12} fontWeight={600} fill="#f5f5f4">
            {fmtARS(pts[hover])}
          </text>
        </g>
      )}
    </svg>
  );
}

export function CalculadoraRentabilidad() {
  const [form, setForm] = useState<Form>(() => toForm(DEFAULT_INPUT, DEFAULT_CASO_ID));
  const [manual, setManual] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const input = useMemo(() => toInput(form), [form]);
  const r = useMemo(() => calcular(input), [input]);

  const set = (k: keyof Form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  // Touching ventas or margen by hand means the numbers no longer belong to
  // the selected real case.
  const setManualField = (k: "ventas" | "margen") => (v: string) => {
    setManual(form.ubic !== "otro");
    setForm((f) => ({ ...f, [k]: v, ubic: "otro" }));
  };
  const usarCaso = (id: string) => {
    setManual(false);
    setForm((f) => aplicarCaso(f, id));
  };
  const elegirUbic = (id: string) => {
    if (id !== "otro") return usarCaso(id);
    setManual(false);
    setForm((f) => ({ ...f, ubic: "otro" }));
  };

  // The mobile summary bar only shows while the form is on screen — that's
  // when the results column (stacked below it) is out of view.
  const formRef = useRef<HTMLDivElement>(null);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const caso = CASOS.find((c) => c.id === form.ubic);
  const ubicHint = caso
    ? `Esta máquina factura ${fmtARS(caso.ing)} por mes y le queda un ${margenDeCaso(caso)} % después de la mercadería. Con un ticket de ${fmtARS(input.ticket)} son unas ${form.ventas} ventas por día.`
    : manual
      ? "Ajustaste los valores a mano."
      : "Cargá tus propias ventas y margen.";

  const maxQueda = Math.max(...CASOS.map((c) => c.ing - c.cost));

  return (
    <section
      aria-label={CALCULADORA_CONTENT.ariaLabel}
      className="bg-ink-950 pt-[calc(72px+var(--spacing-section))] pb-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{CALCULADORA_CONTENT.tag}</SectionTag>
          <h1 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {CALCULADORA_CONTENT.pageHeading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">{CALCULADORA_CONTENT.pageLead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CALCULADORA_CONTENT.chips.map((c) => (
              <li
                key={c.text}
                className="rounded-chip border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-300"
              >
                <b className="font-semibold text-paper">{c.strong}</b> {c.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* ---- Datos ---- */}
          <Reveal delay={0.08} className="rounded-card border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-5 sm:p-6">
            <div ref={formRef}>
            <h2 className="font-display text-sm font-semibold tracking-[0.08em] text-paper uppercase">Tus datos</h2>

            <Step n="01" title="Equipo y forma de pago">
              <p className="text-[12.5px] text-ink-400">{CALCULADORA_CONTENT.equipo}</p>
              <fieldset className="grid gap-2.5">
                <legend className="sr-only">Forma de pago</legend>
                {PAGOS.map((p) => (
                  <label
                    key={p.id}
                    className="relative grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-card border border-white/10 bg-black/20 p-3.5 transition-colors hover:border-white/20 has-checked:border-red-500/75 has-checked:bg-red-500/10 has-focus-visible:ring-3 has-focus-visible:ring-red-500/25"
                  >
                    <input
                      type="radio"
                      name="pago"
                      value={p.id}
                      checked={form.pago === p.id}
                      onChange={() => set("pago")(p.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-white/25 peer-checked:border-red-500 peer-checked:after:h-2 peer-checked:after:w-2 peer-checked:after:rounded-full peer-checked:after:bg-red-500 peer-checked:after:content-['']"
                    />
                    <span>
                      <span className="block text-[14.5px] font-semibold text-paper">{p.nombre}</span>
                      <span className="mt-0.5 block text-xs text-ink-300">{p.detalle}</span>
                    </span>
                    <span className="text-right whitespace-nowrap tabular-nums">
                      {p.lista && <s className="block text-xs text-ink-400">{fmtUSD(p.lista)}</s>}
                      <b className="text-[15px] text-paper">{fmtUSD(p.precio)}</b>
                      <small className="block text-[11px] text-ink-300">+ IVA</small>
                    </span>
                    {p.badge && (
                      <span className="absolute -top-2.5 right-3.5 rounded-chip bg-red-500 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-white">
                        {p.badge}
                      </span>
                    )}
                  </label>
                ))}
              </fieldset>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NumberField label="Cantidad de máquinas" value={form.cant} min={1} max={50} onChange={set("cant")} />
                <NumberField label="Flete y extras (ARS)" value={form.flete} step={10000} onChange={set("flete")} />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between gap-3 rounded-btn border border-dashed border-white/20 px-3.5 py-2.5 text-[13.5px] text-ink-200">
                  <span>
                    IVA<small className="block text-[11.5px] text-ink-400">Máquina expendedora</small>
                  </span>
                  <b className="text-paper">10,5 %</b>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-btn border border-dashed border-white/20 px-3.5 py-2.5 text-[13.5px] text-ink-200">
                  <span>
                    Dólar
                    <small className="block text-[11.5px] text-ink-400">
                      {DOLAR.fuente}, {DOLAR.fecha}
                    </small>
                  </span>
                  <b className="text-paper tabular-nums">${DOLAR.valor.toLocaleString("es-AR")}</b>
                </div>
              </div>
            </Step>

            <Step n="02" title="Ubicación">
              <label className="grid gap-1.5 text-[13.5px] font-medium text-ink-200">
                Tipo de lugar
                <select
                  value={form.ubic}
                  onChange={(e) => elegirUbic(e.target.value)}
                  className={cn(inputClasses, "font-semibold [&>option]:bg-ink-800")}
                >
                  {CASOS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} · caso real
                    </option>
                  ))}
                  <option value="otro">Otro lugar (cargo mis datos)</option>
                </select>
              </label>
              <p className="text-[12.5px] text-ink-400" aria-live="polite">
                {ubicHint}
              </p>
            </Step>

            <Step n="03" title="Ventas">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NumberField label="Ventas por día (por máquina)" value={form.ventas} onChange={setManualField("ventas")} />
                <NumberField
                  label="Ticket promedio (ARS)"
                  value={form.ticket}
                  step={100}
                  onChange={set("ticket")}
                  // Re-derive ventas/día from the selected case once the
                  // visitor is done typing the ticket (not on every key).
                  onBlur={() => form.ubic !== "otro" && usarCaso(form.ubic)}
                />
              </div>
              <RangeField label="Días de venta por mes" value={form.dias} min={15} max={31} onChange={set("dias")} />
              <RangeField
                label="Margen sobre la venta (lo que te queda después de pagar la mercadería)"
                value={form.margen}
                min={10}
                max={80}
                suffix=" %"
                onChange={setManualField("margen")}
              />
            </Step>

            <Step n="04" title="Gastos mensuales por máquina">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NumberField label="Alquiler fijo del espacio (ARS)" value={form.alq} step={5000} onChange={set("alq")} />
                <NumberField label="Luz + internet/chip (ARS)" value={form.luz} step={5000} onChange={set("luz")} />
              </div>
              <p className="text-[12.5px] text-ink-400">{CALCULADORA_CONTENT.luzHint}</p>
            </Step>
            </div>
          </Reveal>

          {/* ---- Resultados ---- */}
          <div ref={resultsRef} className="grid scroll-mt-24 gap-4 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-card border border-red-500/45 bg-[radial-gradient(500px_220px_at_100%_0%,rgba(215,38,56,0.32),transparent_70%),linear-gradient(180deg,#16080b,#0b0709)] p-6">
              <div className="text-xs font-semibold tracking-[0.16em] text-red-200 uppercase">
                Ganancia bruta estimada por mes
              </div>
              <div
                aria-live="polite"
                className="font-display my-1.5 text-[clamp(2.5rem,7vw,4rem)] leading-none font-semibold text-paper tabular-nums"
              >
                {fmtARS(r.neta)}
              </div>
              <div className="text-sm text-ink-200">
                {r.cant > 1
                  ? `${r.cant} máquinas · ${fmtARS(r.netaU)} cada una`
                  : `con ${form.ventas || 0} ventas por día a ${fmtARS(input.ticket)}`}
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-btn border border-amber-400/55 bg-amber-400/10 px-3 py-1.5 text-[13.5px] font-semibold text-amber-300">
                <AlertTriangle size={15} aria-hidden="true" />
                {CALCULADORA_CONTENT.noImpuestos}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                { l: "Recuperás en", v: fmtMeses(r.recupero), tone: "red", hl: true },
                { l: "Retorno mensual", v: fmtPct(r.roi) },
                { l: "Factura por mes", v: fmtARSCorto(r.factura) },
                { l: "Inversión total", v: fmtARSCorto(r.inversion) },
                { l: "Año 1, ya restada la inversión", v: fmtARSCorto(r.anio1), tone: r.anio1 >= 0 ? "ok" : "red" },
                { l: "3 años, ya restada la inversión", v: fmtARSCorto(r.anio3), tone: r.anio3 >= 0 ? "ok" : "red" },
              ].map((k) => (
                <div
                  key={k.l}
                  className={cn(
                    "min-w-0 rounded-card border border-white/10 bg-white/[0.03] p-3.5",
                    k.hl && "border-red-500/50 bg-red-500/[0.06]",
                  )}
                >
                  <dt className="text-[11px] font-semibold tracking-[0.08em] text-ink-400 uppercase">{k.l}</dt>
                  <dd
                    className={cn(
                      "mt-1 text-lg font-semibold text-paper tabular-nums [overflow-wrap:anywhere]",
                      k.tone === "ok" && "text-emerald-400",
                      k.tone === "red" && "text-red-400",
                    )}
                  >
                    {k.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rounded-card border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-5 sm:p-6">
              <h2 className="font-display text-sm font-semibold tracking-[0.08em] text-paper uppercase">Tu inversión</h2>
              <div className="mt-3 grid gap-1.5 text-[13.5px] text-ink-200 [&>div]:flex [&>div]:justify-between [&>div]:gap-3 [&_b]:text-right [&_b]:whitespace-nowrap [&_b]:text-paper [&_b]:tabular-nums">
                <div>
                  <span>
                    {r.pago.resumen} · {r.cant} máquina{r.cant > 1 ? "s" : ""}
                  </span>
                  <b>{fmtUSD(r.pago.precio * r.cant)} + IVA</b>
                </div>
                {r.pago.plan.map(([t, v]) => (
                  <div key={t}>
                    <span>{t}</span>
                    <b>{fmtUSD(v * r.cant)} + IVA</b>
                  </div>
                ))}
                <div>
                  <span>Total con IVA (10,5 %)</span>
                  <b>{fmtUSD(Math.round(r.usdTotal * 100) / 100)}</b>
                </div>
                <div>
                  <span>
                    En pesos (dólar ${DOLAR.valor.toLocaleString("es-AR")})
                    {input.flete ? " + flete" : ""}
                  </span>
                  <b>{fmtARS(r.inversion)}</b>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-5 sm:p-6">
              <h2 className="font-display text-sm font-semibold tracking-[0.08em] text-paper uppercase">
                Cómo se arma el número
              </h2>
              <table className="mt-2 w-full border-collapse text-sm tabular-nums">
                <caption className="sr-only">Detalle mensual</caption>
                <tbody className="[&_td]:border-b [&_td]:border-white/10 [&_td]:py-2.5 [&_td:last-child]:text-right [&_td:last-child]:font-semibold">
                  <tr>
                    <td className="text-ink-200">Facturación</td>
                    <td className="text-paper">{fmtARS(r.factura)}</td>
                  </tr>
                  <tr>
                    <td className="text-ink-200">Mercadería</td>
                    <td className="text-ink-300">– {fmtARS(r.mercaderia)}</td>
                  </tr>
                  <tr>
                    <td className="text-ink-200">Alquiler, luz e internet</td>
                    <td className="text-ink-300">– {fmtARS(r.fijos)}</td>
                  </tr>
                  <tr className="[&_td]:border-b-0 [&_td]:pt-3 [&_td]:font-semibold">
                    <td className="text-paper">Ganancia bruta por mes</td>
                    <td className="text-red-400">{fmtARS(r.neta)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-[12.5px] font-semibold text-amber-300">⚠ {CALCULADORA_CONTENT.noImpuestos}.</p>
              <div className="mt-4">
                <RecuperoChart inversion={r.inversion} neta={r.neta} />
                <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-ink-300">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="inline-block h-[3px] w-3 rounded-sm bg-red-500" aria-hidden="true" />
                    Ganancia bruta acumulada
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="inline-block h-0 w-3 border-t-2 border-dashed border-ink-300" aria-hidden="true" />
                    Inversión
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Casos reales ---- */}
        <Reveal delay={0.1} className="mt-5 rounded-card border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-5 sm:p-6">
          <h2 className="font-display text-sm font-semibold tracking-[0.08em] text-paper uppercase">
            {CALCULADORA_CONTENT.casosHeading}{" "}
            <span className="font-body text-[13px] font-medium tracking-normal text-ink-300 normal-case">
              ({CALCULADORA_CONTENT.noImpuestos.toLowerCase()})
            </span>
          </h2>
          <p className="mt-1 text-[12.5px] text-ink-400">{CALCULADORA_CONTENT.casosLead}</p>
          <table className="mt-3 w-full border-collapse text-sm tabular-nums">
            <thead className="hidden sm:table-header-group">
              <tr className="[&_th]:border-b [&_th]:border-white/20 [&_th]:px-2 [&_th]:py-2.5 [&_th]:text-[11px] [&_th]:font-semibold [&_th]:tracking-[0.12em] [&_th]:text-ink-400 [&_th]:uppercase">
                <th className="text-left">Ubicación</th>
                <th className="text-right">Factura / mes</th>
                <th className="text-right">Mercadería / mes</th>
                <th className="text-right">Le queda / mes</th>
                <th className="text-left">Margen</th>
                <th>
                  <span className="sr-only">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CASOS.map((c) => {
                const queda = c.ing - c.cost;
                return (
                  <tr
                    key={c.id}
                    className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-white/10 py-3.5 sm:table-row sm:py-0 sm:[&_td]:border-b sm:[&_td]:border-white/10 sm:[&_td]:px-2 sm:[&_td]:py-3"
                  >
                    <td className="col-span-2 font-semibold text-paper sm:font-normal">{c.nombre}</td>
                    <td className="sm:text-right">
                      <span className="block text-[11px] tracking-wide text-ink-400 uppercase sm:hidden">Factura / mes</span>
                      {fmtARS(c.ing)}
                    </td>
                    <td className="sm:text-right">
                      <span className="block text-[11px] tracking-wide text-ink-400 uppercase sm:hidden">Mercadería / mes</span>
                      {fmtARS(c.cost)}
                    </td>
                    <td className="sm:text-right">
                      <span className="block text-[11px] tracking-wide text-ink-400 uppercase sm:hidden">Le queda / mes</span>
                      <b className="text-paper">{fmtARS(queda)}</b>
                      <span
                        aria-hidden="true"
                        className="mt-1 block h-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-400 sm:ml-auto"
                        style={{ width: `${Math.round((queda / maxQueda) * 90)}px` }}
                      />
                    </td>
                    <td>
                      <span className="block text-[11px] tracking-wide text-ink-400 uppercase sm:hidden">Margen</span>
                      {margenDeCaso(c)} %
                    </td>
                    <td className="col-span-2 sm:text-right">
                      <button
                        type="button"
                        onClick={() => {
                          usarCaso(c.id);
                          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="rounded-chip border border-white/20 px-3 py-1.5 text-[12.5px] font-semibold text-paper transition-colors hover:border-red-500 hover:bg-red-500/15"
                      >
                        Usar<span className="sr-only"> el caso {c.nombre}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        {/* ---- CTA ---- */}
        <Reveal
          delay={0.12}
          className="mt-5 flex flex-col items-start justify-between gap-5 rounded-card border border-red-500/50 bg-gradient-to-br from-red-500 via-red-700 to-red-900 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="font-display text-xl font-semibold text-white sm:text-2xl">
              {CALCULADORA_CONTENT.pageCtaHeading}
            </p>
            <p className="mt-1 text-sm text-white/85">{CALCULADORA_CONTENT.pageCtaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={whatsappHref(WHATSAPP_MESSAGES.calculadora)}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
            >
              <WhatsAppIcon />
              {CALCULADORA_CONTENT.pageCtaLabel}
            </Button>
            <Button href="/" variant="ghost" className="border-white/40">
              Volver al inicio
            </Button>
          </div>
        </Reveal>

        <p className="mt-6 max-w-[92ch] text-xs leading-relaxed text-ink-400">
          {CALCULADORA_CONTENT.fine} Dólar de referencia: {DOLAR.fuente}, {DOLAR.fecha}.
        </p>
      </Container>

      {/* Resumen fijo en mobile mientras se cargan los datos (la columna de
          resultados queda abajo del formulario). Deja libre la esquina del
          AsesorChatWidget. */}
      <button
        type="button"
        onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        aria-hidden={!formVisible}
        tabIndex={formVisible ? 0 : -1}
        className={cn(
          "fixed bottom-6 left-4 right-24 z-30 flex items-center justify-between gap-3 rounded-card border border-red-500/45 bg-ink-950/90 px-4 py-2.5 text-left backdrop-blur-md transition-all duration-300 lg:hidden",
          formVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <span className="min-w-0">
          <span className="block text-[10.5px] tracking-wide text-red-200 uppercase">Ganancia bruta / mes</span>
          <span className="font-display block truncate text-lg leading-tight font-semibold text-paper tabular-nums">
            {fmtARS(r.neta)}
          </span>
          <span className="block truncate text-[11px] text-ink-300">
            {isFinite(r.recupero) ? `Recuperás en ${fmtMeses(r.recupero)}` : "No recupera"}
          </span>
        </span>
        <span className="shrink-0 rounded-chip bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">Ver detalle</span>
      </button>
    </section>
  );
}
