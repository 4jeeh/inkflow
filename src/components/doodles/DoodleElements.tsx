import React from "react";
import { cn } from "@/lib/utils";

/**
 * 1. Garis Bawah Bergelombang (Wavy Hand-Drawn Underline for Balance Titles & Headers)
 */
export function WavyUnderline({
  className,
  color = "#FB923C",
  secondaryColor = "#1E1E24",
}: {
  className?: string;
  color?: string;
  secondaryColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-3.5 overflow-visible select-none pointer-events-none", className)}
      aria-hidden="true"
    >
      <path
        d="M3 11.5C24 4.5 41 16.5 64 9.5C87 2.5 108 16.5 132 9.5C156 2.5 178 15.5 202 8.5C216 4.5 228 11 237 7.5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15.5C32 10.5 55 18 82 13.5C109 9 138 17 168 12.5C192 9 214 15 233 12"
        stroke={secondaryColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="1 0"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * 2. Lingkaran Tak Beraturan di Highlight (Irregular Hand-Drawn Highlight Loop)
 */
export function DoodleCircle({
  children,
  className,
  strokeColor = "#FB923C",
}: {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}) {
  return (
    <span className={cn("relative inline-flex items-center justify-center px-3 py-1", className)}>
      <svg
        viewBox="0 0 140 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none select-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M18 9C48 1.5 108 2 126 15.5C141 26.5 132 45 98 49.5C62 54 14 49 6 32C-1 17.5 22 5.5 58 6.5"
          stroke={strokeColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C38 5 102 5 122 19C135 28 124 43 92 47C55 51 12 44 8 29"
          stroke="#1E1E24"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/**
 * 3. Panah Sketsa Tangan (Hand-Sketched Curved Arrow)
 */
export function SketchedArrow({
  className,
  color = "#1E1E24",
  direction = "down-left",
}: {
  className?: string;
  color?: string;
  direction?: "down-left" | "down-right" | "up-right" | "right";
}) {
  const transforms: Record<string, string> = {
    "down-left": "",
    "down-right": "scale(-1, 1)",
    "up-right": "scale(-1, -1)",
    right: "rotate(-35deg)",
  };

  return (
    <svg
      viewBox="0 0 88 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: transforms[direction] }}
      className={cn("w-16 h-10 overflow-visible select-none pointer-events-none", className)}
      aria-hidden="true"
    >
      <path
        d="M82 6C64 4 42 10 27 24C18 32.5 13 41 9 49"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6 35C7.2 41.5 7.8 46.8 8.5 50.5C12.8 48.2 18.5 45.8 24.5 44.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 4. Sticky Notes Catatan (Tactile Editorial Sticky Note with Pin/Tape & Handwriting)
 */
export function StickyNote({
  title = "Catatan Tinta",
  children,
  variant = "yellow",
  tilt = "left",
  className,
  footer,
  onEdit,
}: {
  title?: string;
  children: React.ReactNode;
  variant?: "yellow" | "tangerine" | "cobalt" | "sage";
  tilt?: "left" | "right" | "none";
  className?: string;
  footer?: string;
  onEdit?: () => void;
}) {
  const bgStyles = {
    yellow: "bg-[#FEF3C7] text-[#1E1E24]",
    tangerine: "bg-[#FFEDD5] text-[#1E1E24]",
    cobalt: "bg-[#DBEAFE] text-[#1E1E24]",
    sage: "bg-[#ECFCCB] text-[#1E1E24]",
  };

  const tapeAccent = {
    yellow: "#FB923C",
    tangerine: "#EA580C",
    cobalt: "#3B82F6",
    sage: "#84CC16",
  };

  const tiltStyles = {
    left: "-rotate-[1.2deg] hover:rotate-0",
    right: "rotate-[1.2deg] hover:rotate-0",
    none: "rotate-0",
  };

  return (
    <div
      className={cn(
        "relative border-2 border-[#1E1E24] rounded-lg p-4 transition-transform duration-200 shadow-ink",
        bgStyles[variant],
        tiltStyles[tilt],
        className
      )}
    >
      {/* Hand-drawn masking tape strip at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FAF8F5]/90 border-2 border-[#1E1E24] -rotate-2 flex items-center justify-center shadow-sm">
        <div
          className="w-12 h-0.5 rounded-full opacity-70"
          style={{ backgroundColor: tapeAccent[variant] }}
        />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between gap-2 mb-1.5 pt-1">
        <span className="font-sketch text-xs uppercase tracking-wider font-bold text-[#1E1E24]/80 flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full border border-[#1E1E24]"
            style={{ backgroundColor: tapeAccent[variant] }}
          />
          {title}
        </span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-semibold underline decoration-wavy decoration-[#1E1E24]/60 hover:text-[#EA580C] transition-colors"
          >
            Ubah catatan
          </button>
        )}
      </div>

      {/* Handwritten body */}
      <div className="font-hand text-xl leading-snug text-[#1E1E24] font-semibold">
        {children}
      </div>

      {footer && (
        <div className="mt-2 pt-1.5 border-t border-dashed border-[#1E1E24]/30 flex items-center justify-between text-xs font-medium text-[#1E1E24]/75">
          <span>{footer}</span>
          <span className="font-hand text-sm font-bold">@4jeeh</span>
        </div>
      )}
    </div>
  );
}

/**
 * 5. Inkflow Custom Brand Mark (Hand-Drawn Fountain Nib + Flowing Ink Loop)
 */
export function InkflowMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10 flex-shrink-0", className)}
      aria-label="inkflow logo"
    >
      <rect
        x="2"
        y="2"
        width="40"
        height="40"
        rx="10"
        fill="#FB923C"
        stroke="#1E1E24"
        strokeWidth="2.5"
      />
      {/* Abstract Cobalt Ink Drop / Arch */}
      <path
        d="M9 32C12 24 18 14 28 11C31 19 32 26 35 32"
        fill="#3B82F6"
      />
      {/* Fountain Nib & Squiggle */}
      <path
        d="M22 8L13 24L18 33H26L31 24L22 8Z"
        fill="#FAF8F5"
        stroke="#1E1E24"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M22 8V21"
        stroke="#1E1E24"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="22.5" r="2.2" fill="#1E1E24" />
      <path
        d="M9 35.5C15 32.5 21 38 27 34.5C31 32.5 34 35.5 36 34"
        stroke="#1E1E24"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 6. Abstract Doodle Artwork for Wallet Cards
 */
export function AbstractWalletArt({
  pattern,
  className,
}: {
  pattern: "cobalt-arch" | "tangerine-bauhaus" | "sage-botanical";
  className?: string;
}) {
  if (pattern === "cobalt-arch") {
    return (
      <svg
        viewBox="0 0 320 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full object-cover pointer-events-none select-none", className)}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Abstract Cobalt & Tangerine Shapes */}
        <circle cx="265" cy="42" r="56" fill="#3B82F6" fillOpacity="0.22" />
        <path
          d="M210 190C210 138 245 102 292 102C312 102 325 110 330 120V190H210Z"
          fill="#FB923C"
          fillOpacity="0.35"
        />
        <path
          d="M185 28C215 12 258 18 282 46C305 74 294 122 260 142"
          stroke="#1E1E24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 6"
          opacity="0.45"
        />
        {/* Hand-drawn star doodle */}
        <path
          d="M242 64L246 76L258 79L246 83L242 95L238 83L226 79L238 76L242 64Z"
          fill="#FB923C"
          stroke="#1E1E24"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16 156C55 142 94 168 136 152C168 140 196 158 225 148"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    );
  }

  if (pattern === "sage-botanical") {
    return (
      <svg
        viewBox="0 0 320 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full object-cover pointer-events-none select-none", className)}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M220 -10C265 -10 315 25 315 78C315 131 265 162 215 145C175 131 182 70 202 32C212 12 195 -10 220 -10Z"
          fill="#84CC16"
          fillOpacity="0.26"
        />
        <circle cx="275" cy="145" r="42" fill="#3B82F6" fillOpacity="0.2" />
        {/* Hand-drawn organic leaf/loop lines */}
        <path
          d="M235 145C238 112 256 76 288 48"
          stroke="#1E1E24"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M248 112C232 104 226 88 238 78C250 68 265 86 252 108"
          stroke="#1E1E24"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M266 84C280 78 294 86 288 99C282 112 264 104 266 84Z"
          fill="#84CC16"
          stroke="#1E1E24"
          strokeWidth="1.8"
          opacity="0.7"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full object-cover pointer-events-none select-none", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x="212"
        y="18"
        width="88"
        height="88"
        rx="20"
        transform="rotate(14 212 18)"
        fill="#FB923C"
        fillOpacity="0.28"
      />
      <circle cx="228" cy="136" r="38" fill="#84CC16" fillOpacity="0.24" />
      <path
        d="M194 45C216 28 242 62 264 42C286 22 302 55 316 38"
        stroke="#1E1E24"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M194 60C216 43 242 77 264 57C286 37 302 70 316 53"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
