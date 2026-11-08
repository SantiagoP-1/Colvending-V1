"use client";

import { useEffect } from "react";
import { Instrument_Sans } from "next/font/google";
import "./asesor-chat-widget.css";

// Self-hosted by next/font instead of the embed's Google Fonts <link> (no
// third-party request, no extra stylesheet). Only this widget uses it, so
// it isn't preloaded — that would compete with the hero's fonts on every
// page for a corner button.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  preload: false,
});

// The "Asesor Colvending" chatbot is a separate PHP app hosted on its own
// Hostinger account (Vercel has no PHP runtime) and embedded as an iframe.
const CHAT_URL = "https://asesor.colvending.com/asesor/";

// Port of the official widget-embed.html: same IDs, styles and behavior.
// Mounted once in the root layout, which persists across client-side
// navigations, so the listeners are registered once; the effect's cleanup
// removes them on unmount (and on React Strict Mode's dev double-run).
// The component has no state, so React never re-renders this markup and
// the classes/iframe src the effect sets on the DOM aren't overwritten.
export function AsesorChatWidget() {
  useEffect(() => {
    const launcher = document.getElementById("cv-chat-launcher");
    const panel = document.getElementById("cv-chat-panel");
    const iframe = document.getElementById("cv-chat-iframe") as HTMLIFrameElement | null;
    if (!launcher || !panel || !iframe) return;

    const chatOrigin = new URL(CHAT_URL).origin;
    const mobile = window.matchMedia("(max-width: 480px)");
    let loaded = false;
    let isOpen = false;

    function openChat() {
      if (!launcher || !panel || !iframe) return;
      // The iframe only loads on first open, so visitors who never open the
      // chat never pay for the extra request/PHP session.
      if (!loaded) {
        iframe.src = CHAT_URL;
        loaded = true;
      }
      // En mobile el chat es pantalla completa: bloquear el scroll de la página de fondo
      if (mobile.matches) document.documentElement.classList.add("cv-chat-lock");
      setTimeout(() => {
        try {
          iframe.focus();
        } catch {}
      }, 200);
      panel.classList.add("open");
      requestAnimationFrame(() => panel.classList.add("visible"));
      launcher.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      launcher.setAttribute("aria-label", "Cerrar chat");
      isOpen = true;
    }

    function closeChat() {
      if (!launcher || !panel) return;
      panel.classList.remove("visible", "open");
      document.documentElement.classList.remove("cv-chat-lock");
      launcher.classList.remove("is-open");
      launcher.setAttribute("aria-expanded", "false");
      launcher.setAttribute("aria-label", "Abrir chat con un asesor de Colvending");
      isOpen = false;
      launcher.focus();
    }

    function onLauncherClick() {
      if (isOpen) closeChat();
      else openChat();
    }
    // La cruz vive dentro del chat (cabecera del iframe) y avisa por postMessage
    function onMessage(e: MessageEvent) {
      if (e.origin !== chatOrigin) return;
      if (e.data && e.data.type === "cv-chat-close" && isOpen) closeChat();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) closeChat();
    }

    launcher.addEventListener("click", onLauncherClick);
    window.addEventListener("message", onMessage);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      launcher.removeEventListener("click", onLauncherClick);
      window.removeEventListener("message", onMessage);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("cv-chat-lock");
    };
  }, []);

  return (
    <>
      <button
        id="cv-chat-launcher"
        className={instrumentSans.variable}
        type="button"
        aria-label="Abrir chat con un asesor de Colvending"
        aria-expanded="false"
        aria-controls="cv-chat-panel"
      >
        <span className="cv-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
        </span>
        <span className="cv-text" aria-hidden="true">
          <span className="cv-title">Pedí asesoramiento</span>
          <span className="cv-sub">En línea · 3 preguntas y listo</span>
        </span>
        <svg
          className="cv-x"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div id="cv-chat-panel" role="dialog" aria-label="Asesor Colvending">
        <iframe id="cv-chat-iframe" src="about:blank" title="Asesor Colvending" />
      </div>
    </>
  );
}
