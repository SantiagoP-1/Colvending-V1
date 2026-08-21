"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SEEK_STEP_SECONDS = 5;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface AudioPlayerProps {
  src: string;
  label: string;
  className?: string;
}

// Small custom player instead of the browser's native <audio controls> —
// the native widget can't be restyled to match the site (dark card, red
// accent), and its exact look/behavior differs across browsers.
export function AudioPlayer({ src, label, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setPlaying(false);

    // On a page this busy (framer-motion, GSAP, other sections all mounting
    // at once), React committing this effect can lose the race against the
    // browser's own metadata fetch for a small local file — readyState >=1
    // (HAVE_METADATA) means duration is already known and no
    // loadedmetadata/durationchange event is coming to tell us so.
    if (audio.readyState >= 1) setDuration(audio.duration);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  function seekTo(time: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const clamped = Math.min(Math.max(time, 0), duration);
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio * duration);
  }

  function handleTrackKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      seekTo(currentTime + SEEK_STEP_SECONDS);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekTo(currentTime - SEEK_STEP_SECONDS);
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-btn border border-white/10 bg-white/[0.02] p-3",
        className,
      )}
    >
      {/* preload="metadata" only fetches enough to know duration/seek
          points, not the full 700KB+ file, until the visitor hits play. */}
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? `Pausar: ${label}` : `Reproducir: ${label}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500 transition-colors duration-200 hover:bg-red-500/25"
      >
        {playing ? (
          <Pause size={16} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={16} className="ml-0.5" fill="currentColor" aria-hidden="true" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-paper">{label}</p>
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Progreso del audio"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
          onClick={handleTrackClick}
          onKeyDown={handleTrackKeyDown}
          className="mt-1.5 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
        >
          <div
            className="h-full rounded-full bg-red-500 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <span className="shrink-0 text-[10px] font-medium tracking-wide text-ink-400 tabular-nums">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}
