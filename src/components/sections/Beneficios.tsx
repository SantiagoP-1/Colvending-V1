import {
  Clock,
  UserX,
  Smartphone,
  TrendingUp,
  Wrench,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { BENEFICIOS_CONTENT } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  userX: UserX,
  smartphone: Smartphone,
  trendingUp: TrendingUp,
  wrench: Wrench,
  dollar: CircleDollarSign,
};

export function Beneficios() {
  return (
    <section
      id="beneficios"
      aria-label="Beneficios de las máquinas expendedoras"
      className="bg-ink-950 py-section"
    >
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionTag>{BENEFICIOS_CONTENT.tag}</SectionTag>
            <h2 className="font-display mt-6 text-4xl font-semibold text-paper sm:text-5xl">
              {BENEFICIOS_CONTENT.heading}
            </h2>
          </Reveal>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {BENEFICIOS_CONTENT.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.titulo} delay={index * 0.06}>
                <div className="group flex items-start gap-6 py-7">
                  <span className="font-display shrink-0 text-sm font-semibold text-ink-300 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-red-500 transition-colors duration-300 group-hover:border-red-500/30 group-hover:bg-red-500/10">
                    {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-paper">
                      {item.titulo}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
