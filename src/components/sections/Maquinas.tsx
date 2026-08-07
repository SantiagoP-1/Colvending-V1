"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import machinePhoto from "@/assets/images/maquina.webp";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { MAQUINAS_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

type MachineId = (typeof MAQUINAS_CONTENT.items)[number]["id"];

const TABPANEL_ID = "maquinas-panel";

export function Maquinas() {
  const [activeId, setActiveId] = useState<MachineId>(MAQUINAS_CONTENT.items[0].id);
  const active =
    MAQUINAS_CONTENT.items.find((item) => item.id === activeId) ??
    MAQUINAS_CONTENT.items[0];

  return (
    <section
      id="maquinas"
      aria-label="Tipos de máquinas expendedoras"
      className="bg-ink-900 py-section"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{MAQUINAS_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {MAQUINAS_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            {MAQUINAS_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center sm:justify-start">
          <div
            role="tablist"
            aria-label="Tipo de máquina"
            className="inline-flex flex-wrap justify-center gap-2 rounded-chip border border-white/10 bg-white/[0.03] p-1.5"
          >
            {MAQUINAS_CONTENT.items.map((item) => (
              <button
                key={item.id}
                id={`maquinas-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={item.id === activeId}
                aria-controls={TABPANEL_ID}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "rounded-chip px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                  item.id === activeId
                    ? "bg-red-500 text-white"
                    : "text-ink-300 hover:text-paper",
                )}
              >
                {item.categoria}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id={TABPANEL_ID}
          role="tabpanel"
          aria-labelledby={`maquinas-tab-${activeId}`}
          tabIndex={0}
          className="relative mt-10 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-xs"
            >
              <div
                className="absolute inset-x-8 bottom-2 h-14 rounded-full bg-red-600/25 blur-[36px]"
                aria-hidden="true"
              />
              <Image
                src={machinePhoto}
                alt={`Máquina expendedora de ${active.categoria.toLowerCase()} ColVending`}
                sizes="(min-width: 1024px) 320px, 70vw"
                className="relative mx-auto h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              />
              {active.id === "mixta" && (
                <span className="absolute top-0 right-0 rounded-chip bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-red-glow">
                  {active.tagLabel}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
                {active.nombre}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                {active.desc}
              </p>
              <ul className="mt-6 space-y-3" role="list">
                {active.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-3 text-sm font-medium text-ink-200"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    {spec}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
