"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { RENTABILIDAD_CONTENT } from "@/lib/content";
import { RESULTADOS_CONTENT } from "@/lib/resultados";
import { cn } from "@/lib/utils";

export function Rentabilidad() {
  const [roiDetailOpen, setRoiDetailOpen] = useState(false);
  const { roiPorZona } = RENTABILIDAD_CONTENT;

  return (
    <section
      id="rentabilidad"
      aria-label="Análisis de rentabilidad"
      className="bg-ink-950 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{RENTABILIDAD_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {RENTABILIDAD_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {RENTABILIDAD_CONTENT.lead}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:divide-x sm:divide-white/10 lg:grid-cols-4">
          {RENTABILIDAD_CONTENT.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="px-0 sm:px-8 lg:px-6">
              <div className="font-display text-[clamp(1.75rem,2.7vw,2.375rem)] font-semibold text-red-500 leading-none">
                {stat.val}
              </div>
              <div className="mt-3 text-base font-semibold text-paper">
                {stat.label}
              </div>
              <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed text-ink-300">
                {stat.desc}
              </p>
              {stat.detail === "roiPorZona" && (
                <button
                  type="button"
                  onClick={() => setRoiDetailOpen(true)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-300 transition-colors duration-200 hover:text-red-400"
                >
                  <Info size={13} aria-hidden="true" />
                  {roiPorZona.detailLabel}
                </button>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-14">
          <p
            role="note"
            className="rounded-card border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-ink-300"
          >
            {RENTABILIDAD_CONTENT.disclaimer}
          </p>
        </Reveal>

        <Reveal delay={0.42} className="mt-16">
          <h3 className="font-heading text-2xl font-semibold text-paper sm:text-3xl">
            {RESULTADOS_CONTENT.heading}
          </h3>
          <p className="mt-2 text-sm text-ink-300">{RESULTADOS_CONTENT.lead}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:divide-x sm:divide-white/10 lg:grid-cols-4">
          {RESULTADOS_CONTENT.metrics.map((metric, index) => {
            const isUp = metric.changePercent >= 0;
            const isGood = isUp === metric.higherIsBetter;
            const unit = metric.changeUnit === "pts" ? " pts" : "%";
            const changeText = `${metric.changePercent > 0 ? "+" : ""}${metric.changePercent}${unit}`;
            const ArrowIcon = isUp ? ArrowUp : ArrowDown;
            return (
              <Reveal key={metric.id} delay={0.5 + index * 0.08} className="px-0 sm:px-8 lg:px-6">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-[clamp(1.75rem,2.7vw,2.375rem)] font-semibold text-red-500 leading-none">
                    {metric.value}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold",
                      isGood ? "text-emerald-400" : "text-red-400",
                    )}
                  >
                    <ArrowIcon size={12} aria-hidden="true" />
                    {changeText}
                  </span>
                </div>
                <div className="mt-3 text-base font-semibold text-paper">{metric.label}</div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.85} className="mt-6">
          <p className="text-xs text-ink-400">{RESULTADOS_CONTENT.updatedLabel}</p>
        </Reveal>
      </Container>

      <Modal
        open={roiDetailOpen}
        onClose={() => setRoiDetailOpen(false)}
        title={roiPorZona.modalTitle}
      >
        <h3 className="font-display pr-10 text-xl font-semibold text-paper sm:text-2xl">
          {roiPorZona.modalTitle}
        </h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-105 text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold tracking-wide text-ink-300 uppercase">
                {roiPorZona.columns.map((col) => (
                  <th key={col} scope="col" className="pb-3 pr-4 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {roiPorZona.casos.map((caso) => (
                <tr key={caso.cliente}>
                  <td className="py-3 pr-4 font-medium text-paper">{caso.cliente}</td>
                  <td className="py-3 pr-4 text-ink-300">{caso.ubicacion}</td>
                  <td className="py-3 pr-4 text-ink-200">{caso.roiMensual}</td>
                  <td className="py-3 pr-4 text-ink-200">{caso.recupero}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-red-500/30">
                <td colSpan={2} className="py-3 pr-4 font-semibold text-paper">
                  {roiPorZona.promedio.label}
                </td>
                <td className="py-3 pr-4 font-semibold text-red-400">
                  {roiPorZona.promedio.roiMensual}
                </td>
                <td className="py-3 pr-4 font-semibold text-red-400">
                  {roiPorZona.promedio.recupero}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </section>
  );
}
