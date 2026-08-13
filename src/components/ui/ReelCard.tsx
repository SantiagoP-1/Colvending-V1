import { Camera, Play } from "lucide-react";

type ReelCardProps = {
  title: string;
  thumbnail: string;
  videoUrl: string;
};

// Thumbnail renders as a CSS background (not next/image) on purpose: if a
// future reel's `thumbnail` path is ever missing its file, a CSS background
// simply falls back to bg-ink-800 instead of showing a broken-image icon
// like <Image> would.
//
// The background lives on its own absolutely-positioned layer, inset by
// -1px on every side, rather than directly on the card element. Cards get
// a fractional rendered height (aspect-[9/16] on a percentage-based grid
// column), and a background-image painted on the same element as
// rounded-card + overflow-hidden can leave a hairline gap at the bottom
// edge where the browser's corner clip and the background box don't quite
// agree on the sub-pixel boundary. Overshooting the box removes any room
// for that gap to appear; the parent's overflow-hidden still clips it back
// to the rounded rect.
export function ReelCard({ title, thumbnail, videoUrl }: ReelCardProps) {
  const hasRealLink = videoUrl.length > 0;

  return (
    <a
      href={hasRealLink ? videoUrl : "#"}
      target={hasRealLink ? "_blank" : undefined}
      rel={hasRealLink ? "noopener noreferrer" : undefined}
      className="group isolate relative flex aspect-[9/16] w-full flex-col justify-between overflow-hidden rounded-card border border-white/10 bg-ink-800 p-4 transition-transform duration-300 ease-out-soft hover:-translate-y-1 sm:mx-auto sm:max-w-72"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-px -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(10,10,11,0.92), rgba(10,10,11,0.1) 55%), url(${thumbnail})`,
        }}
      />

      <div className="flex items-start justify-between">
        <span className="inline-flex items-center rounded-chip bg-red-500 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
          Reel
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
          <Camera size={16} aria-hidden="true" />
        </span>
      </div>

      <span
        className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 ease-out-soft group-hover:scale-110"
        aria-hidden="true"
      >
        <Play size={22} className="ml-0.5" fill="currentColor" />
      </span>

      <div>
        <p className="text-[15px] leading-snug font-semibold text-paper">{title}</p>
        <p className="mt-1 text-xs font-medium text-ink-200">Ver en Instagram</p>
      </div>
    </a>
  );
}
