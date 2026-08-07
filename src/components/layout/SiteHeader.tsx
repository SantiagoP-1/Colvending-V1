"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/images/logo-icon.webp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_LINKS } from "@/lib/nav";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export function SiteHeader() {
  const scrolled = useScrolled();
  const activeId = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-soft",
        scrolled
          ? "border-white/10 bg-ink-950/85 shadow-nav backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2.5"
          aria-label="ColVending — Inicio"
        >
          <Image
            src={logoIcon}
            alt=""
            width={29}
            height={36}
            priority
            className="h-9 w-auto"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-paper">
            COLVENDING
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-sm font-medium text-ink-300 transition-colors duration-200 hover:text-paper",
                  isActive && "text-paper",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-red-500 transition-transform duration-300 ease-out-soft",
                    isActive && "scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={whatsappHref(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="px-5 py-2.5 text-[13px]"
            aria-label="Hablar con un asesor de ColVending por WhatsApp"
          >
            <WhatsAppIcon />
            Hablar con asesor
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-paper lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 bg-ink-950/97 backdrop-blur-lg lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-3.5 text-base font-medium text-ink-200 transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={whatsappHref(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-5 w-full"
              >
                <WhatsAppIcon />
                Hablar con un asesor
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
