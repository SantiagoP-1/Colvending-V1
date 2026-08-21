"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { FAQ_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

const TABPANEL_ID = "faq-panel";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CONTENT.categories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  ),
};

export function Faq() {
  const [activeCat, setActiveCat] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(0);
  const category = FAQ_CONTENT.categories[activeCat];

  function selectCategory(index: number) {
    setActiveCat(index);
    setOpenItem(0);
  }

  return (
    <section id="faq" aria-label="Preguntas frecuentes" className="bg-ink-900 py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <SectionTag>{FAQ_CONTENT.tag}</SectionTag>
          <h2 className="font-heading mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {FAQ_CONTENT.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-300">
            {FAQ_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Categorías de preguntas frecuentes"
            className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FAQ_CONTENT.categories.map((cat, index) => (
              <button
                key={cat.cat}
                id={`faq-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeCat}
                aria-controls={TABPANEL_ID}
                onClick={() => selectCategory(index)}
                className={cn(
                  "shrink-0 rounded-chip border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                  index === activeCat
                    ? "border-red-500 bg-red-500/10 text-paper"
                    : "border-white/10 text-ink-300 hover:border-white/25 hover:text-paper",
                )}
              >
                <span aria-hidden="true">{cat.emoji}</span> {cat.cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id={TABPANEL_ID}
          role="tabpanel"
          aria-labelledby={`faq-tab-${activeCat}`}
          tabIndex={0}
          className="mt-6 divide-y divide-white/10 border-t border-white/10"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={category.cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="divide-y divide-white/10"
            >
              {category.items.map((item, index) => {
                const isOpen = openItem === index;
                const panelId = `faq-answer-${activeCat}-${index}`;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpenItem(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[15px] font-semibold text-paper">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "shrink-0 text-ink-400 transition-transform duration-300",
                          isOpen && "rotate-180 text-red-500",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-sm leading-relaxed text-ink-300">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
