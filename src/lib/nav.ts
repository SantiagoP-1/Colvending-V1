export type NavLink = {
  href: string;
  label: string;
};

// Desktop nav stays condensed; the mobile menu shows a fuller list once
// those sections exist (matches the current site's pattern).
export const NAV_LINKS: NavLink[] = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#maquinas", label: "Máquinas" },
  { href: "#franquicias", label: "Franquicias" },
  { href: "#rentabilidad", label: "Rentabilidad" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
];
