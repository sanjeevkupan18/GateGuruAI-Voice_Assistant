// PATH: client/src/components/Navbar.jsx
import React from "react";

export default function Navbar({ sidebarOpen, onToggleSidebar, onClear }) {
  return (
    <header
      className="
      col-span-2 row-start-1
      flex items-center justify-between
      px-4 h-[56px]
      border-b border-white/10
      bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90
      backdrop-blur-xl z-10
      shadow-[0_1px_0_rgba(255,255,255,0.05)]
    "
    >
      {/* Left */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="
            flex items-center justify-center w-8 h-8
            rounded-md border border-white/10
            bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white
            shadow-sm transition-all
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div
            className="
            w-[26px] h-[26px] rounded-[6px]
            bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400
            flex items-center justify-center
            text-slate-950 text-xs font-black shadow-[0_10px_24px_rgba(139,92,246,0.35)]
          "
          >
            G
          </div>
          <span className="text-md font-medium text-slate-100">
            GateGuru AI
          </span>
          <span
            className="
            text-xs px-2 py-0.5
            bg-violet-500/10 text-violet-200
            border border-violet-400/20 rounded-full
            shadow-sm backdrop-blur
          "
          >
            AI Voice
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* <span
          className="
          text-xs text-slate-300
          bg-white/5 border border-white/10
          rounded-full px-2.5 py-0.5
          shadow-sm
        "
        >
          llama3-8b · Groq
        </span> */}

        <button
          onClick={onClear}
          aria-label="Clear chat"
          className="
            flex items-center gap-1.5
            border border-white/10 rounded-md
            px-2.5 py-1.5 text-xs text-slate-300
            bg-white/5 shadow-sm
            hover:bg-rose-500/10 hover:text-rose-300 hover:border-rose-400/20
            transition-all
          "
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Clear
        </button>
      </div>
    </header>
  );
}
