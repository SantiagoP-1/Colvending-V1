export type NavLink = {
  href: string;
  label: string;
};

// Desktop nav stays condensed; the mobile menu shows a fuller list once
// those sections exist (matches the current site's pattern).
//
// Hrefs are root-relative ("/#beneficios", not "#beneficios") on purpose —
// SiteHeader and SiteFooter render on every page (e.g. /catalogo,
// /ubicaciones), and a bare "#beneficios" only resolves on "/" itself,
// where those section ids actually live. A same-page click still behaves
// identically (same-document hash navigation), so this doesn't change
// anything when already on "/".
export const NAV_LINKS: NavLink[] = [
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#maquinas", label: "Máquinas" },
  { href: "/#franquicias", label: "Franquicias" },
  { href: "/#rentabilidad", label: "Rentabilidad" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#faq", label: "FAQ" },
];
