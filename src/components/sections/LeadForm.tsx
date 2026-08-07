"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LEAD_FORM_CONTENT } from "@/lib/content";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

// Demo-only scoring so the qualified / not-qualified branches both have a
// reachable path. Not a real business rule — there's no backend behind it.
const OPTION_SCORES: Record<string, number> = {
  "sin-definir": 0,
  "una-maquina": 1,
  "varias-maquinas": 2,
  "necesito-ayuda": 0,
  "en-mente": 1,
  listo: 2,
  diversificar: 1,
  "ingreso-extra": 1,
  "negocio-principal": 2,
  "sin-fecha": 0,
  "3-meses": 1,
  ya: 2,
  franquicia: 2,
};

const QUALIFY_THRESHOLD = 4;

type Phase = "form" | "submitting" | "result";

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -24 : 24 }),
};

export function LeadForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [qualified, setQualified] = useState(false);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);

  const steps = LEAD_FORM_CONTENT.steps;
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  // Keyboard/screen-reader users lose their place once the button they
  // clicked unmounts mid-transition — move focus to the next question so
  // navigation stays continuous instead of silently falling back to <body>.
  // This has to be AnimatePresence's onExitComplete, not a useEffect keyed
  // on stepIndex: with mode="wait" the new <h3> doesn't mount (so the ref
  // isn't attached yet) until the outgoing one finishes its exit animation,
  // which lands well after a stepIndex-keyed effect would already have
  // fired and focused nothing. onExitComplete only fires once something
  // has actually exited, so the very first render is naturally skipped too.
  function focusCurrentQuestion() {
    requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function selectOption(value: string) {
    const nextAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(nextAnswers);
    setDirection(1);

    if (!isLastStep) {
      window.setTimeout(() => setStepIndex((i) => i + 1), 320);
      return;
    }

    setPhase("submitting");
    const finalScore = Object.values(nextAnswers).reduce(
      (total, v) => total + (OPTION_SCORES[v] ?? 0),
      0,
    );
    window.setTimeout(() => {
      setQualified(finalScore >= QUALIFY_THRESHOLD);
      setPhase("result");
    }, 1300);
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function reset() {
    setDirection(-1);
    setAnswers({});
    setStepIndex(0);
    setPhase("form");
  }

  const result = qualified
    ? LEAD_FORM_CONTENT.qualified
    : LEAD_FORM_CONTENT.notQualifiedYet;

  return (
    <section
      id="calificar"
      aria-label="Formulario de calificación de lead"
      className="bg-ink-950 py-section"
    >
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <SectionTag>{LEAD_FORM_CONTENT.tag}</SectionTag>
          <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
            {LEAD_FORM_CONTENT.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-300">
            {LEAD_FORM_CONTENT.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div
            aria-live="polite"
            aria-atomic="true"
            className="rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-10"
          >
            {phase === "form" && (
              <>
                <div className="mb-8 flex items-center justify-center gap-2">
                  {steps.map((step, index) => (
                    <span
                      key={step.id}
                      className={cn(
                        "h-1.5 flex-1 max-w-16 rounded-full transition-colors duration-300",
                        index <= stepIndex ? "bg-red-500" : "bg-white/10",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mb-1 text-center text-xs font-semibold tracking-wide text-ink-300 uppercase">
                  Paso {stepIndex + 1} de {steps.length}
                </p>

                <AnimatePresence mode="wait" custom={direction} onExitComplete={focusCurrentQuestion}>
                  <motion.div
                    key={currentStep.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3
                      ref={questionHeadingRef}
                      tabIndex={-1}
                      className="mt-4 text-center text-xl font-semibold text-paper outline-none sm:text-2xl"
                    >
                      {currentStep.question}
                    </h3>

                    <div
                      role="radiogroup"
                      aria-label={currentStep.question}
                      className="mt-7 space-y-3"
                    >
                      {currentStep.options.map((option) => {
                        const selected = answers[currentStep.id] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => selectOption(option.value)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-btn border px-5 py-4 text-left text-[15px] font-medium transition-colors duration-200",
                              selected
                                ? "border-red-500 bg-red-500/10 text-paper"
                                : "border-white/10 bg-white/[0.02] text-ink-200 hover:border-white/25 hover:bg-white/[0.05]",
                            )}
                          >
                            {selected ? (
                              <CheckCircle2
                                size={18}
                                className="shrink-0 text-red-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <Circle
                                size={18}
                                className="shrink-0 text-ink-300"
                                aria-hidden="true"
                              />
                            )}
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex min-h-9 items-center justify-start">
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-300 transition-colors hover:text-paper"
                    >
                      <ArrowLeft size={15} aria-hidden="true" />
                      Volver
                    </button>
                  )}
                </div>
              </>
            )}

            {phase === "submitting" && (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <Loader2 size={28} className="animate-spin text-red-500" aria-hidden="true" />
                <p className="text-sm font-medium text-ink-300">
                  {LEAD_FORM_CONTENT.submitting}
                </p>
              </div>
            )}

            {phase === "result" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-4 text-center"
              >
                <span
                  className={cn(
                    "mx-auto flex h-14 w-14 items-center justify-center rounded-full",
                    qualified
                      ? "bg-red-500/15 text-red-500"
                      : "bg-white/10 text-ink-300",
                  )}
                >
                  <CheckCircle2 size={28} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold text-paper sm:text-3xl">
                  {result.heading}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-300">
                  {result.body}
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button
                    href={whatsappHref(WHATSAPP_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <WhatsAppIcon />
                    {result.cta}
                  </Button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-300 transition-colors hover:text-paper"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    Volver a empezar
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
