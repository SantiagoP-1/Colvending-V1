"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import { ASESOR_CHAT_URL } from "@/lib/asesor";
import { cn } from "@/lib/utils";

// Floating launcher + panel for the "Asesor Colvending" chatbot (a separate
// PHP app the client had built, embedded here as an iframe — see
// src/lib/asesor.ts for why it can't run on Vercel directly). This is the
// site's only floating corner button (the WhatsApp float was removed so the
// bot is the one clear point of contact) — the robot icon signals it's an
// AI assistant rather than a regular chat/WhatsApp link.
//
// The iframe only mounts on first open (not on page load) so a visitor who
// never opens the chat never pays for that extra request/PHP session.
export function AsesorChatWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Renders nothing until Santiago has hosting for the bot and fills in
  // ASESOR_CHAT_URL — a launcher button that opens an empty/broken panel
  // would be worse than no button at all.
  if (!ASESOR_CHAT_URL) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen((v) => !v);
        }}
        aria-label={open ? "Cerrar el asesor virtual" : "Hablar con el asesor virtual"}
        aria-expanded={open}
        title="Asesor virtual ColVending"
        className={cn(
          "fixed right-6 bottom-6 z-70 flex items-center justify-center rounded-full bg-red-500 text-white transition-transform duration-300 ease-out-soft hover:scale-105",
          open
            ? // On mobile the panel below goes full-screen and would otherwise
              // sit on top of this button at its normal bottom-6 spot (same
              // corner the panel's iframe input bar lives in), so it moves to
              // the top-right while open there. It also shrinks and drops the
              // glow — as a close affordance it doesn't need to be as loud as
              // the launcher, and the bot's own "Asesor Expendedoras" title
              // sits right behind it. Desktop keeps the launcher's spot and
              // size since the panel there is a small floating box that never
              // reaches the button.
              "h-14 w-14 shadow-red-glow max-sm:top-12 max-sm:right-4 max-sm:bottom-auto max-sm:h-6 max-sm:w-6 max-sm:shadow-none"
            : "h-14 w-14 shadow-red-glow",
        )}
      >
        {open ? (
          <X size={24} className="max-sm:size-3" aria-hidden="true" />
        ) : (
          <Bot size={24} aria-hidden="true" />
        )}
      </button>

      <div
        className={cn(
          "fixed right-6 bottom-24 z-60 h-[600px] w-[380px] max-h-[calc(100dvh-160px)] overflow-hidden rounded-card border border-white/10 bg-ink-950 shadow-card transition-[opacity,transform] duration-300 ease-out-soft",
          "max-sm:inset-0 max-sm:h-full max-sm:max-h-full max-sm:w-full max-sm:rounded-none max-sm:border-0",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {loaded && (
          <iframe
            src={ASESOR_CHAT_URL}
            title="Asesor virtual ColVending"
            className="h-full w-full border-0"
          />
        )}
      </div>
    </>
  );
}
