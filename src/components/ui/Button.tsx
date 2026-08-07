import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  primary:
    "bg-red-500 text-white border-2 border-red-500 shadow-red-glow hover:bg-red-600 hover:border-red-600",
  ghost:
    "bg-transparent text-paper border-2 border-white/15 hover:border-white/40 hover:bg-white/5",
  white:
    "bg-white text-ink-950 border-2 border-white hover:bg-white/90",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

// A white outline (rather than the site's default red one) stays readable
// against all three variants, including the solid red "primary" button,
// where a red-on-red ring would nearly disappear.
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<"a">, keyof CommonProps> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<React.ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, VARIANT_CLASSES[variant], className);

  if (props.href) {
    // target="_blank" always gets a safe `rel` (even if the caller forgot
    // it) and a screen-reader-only note that it opens in a new tab.
    const { rel, target, ...rest } = props as ButtonAsLink;
    const opensNewTab = target === "_blank";
    return (
      <a
        {...rest}
        target={target}
        rel={opensNewTab ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
      >
        {children}
        {opensNewTab && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
