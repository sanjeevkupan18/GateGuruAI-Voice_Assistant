// PATH: client/src/components/StatusBar.jsx
import React from "react";

const STATUS_CONFIG = {
  idle: {
    color: "bg-teal-400",
    text: "Ready — click the mic or type your question",
  },
  listening: {
    color: "bg-red-400 animate-pulse",
    text: "Listening to your voice...",
  },
  thinking: { color: "bg-purple-400 animate-pulse", text: "AI is thinking..." },
  speaking: {
    color: "bg-amber-400 animate-pulse",
    text: "Speaking response aloud...",
  },
};

export default function StatusBar({ status, onStopSpeaking }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        flex items-center gap-2
        px-5 py-2 min-h-[40px]
        bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90
        border-b border-white/10
        backdrop-blur-xl
      "
    >
      <span
        className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${cfg.color}`}
        aria-hidden="true"
      />
      <span className="text-xs text-slate-300 flex-1 font-medium">
        {cfg.text}
      </span>

      {status === "speaking" && (
        <button
          onClick={onStopSpeaking}
          aria-label="Stop speaking"
          className="
            flex items-center gap-1 text-xs
            border border-white/10 rounded-md
            px-2 py-0.5 text-slate-300
            bg-white/5 shadow-sm
            hover:bg-rose-500/10 hover:text-rose-300 hover:border-rose-400/20
            transition-all
          "
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
          Stop
        </button>
      )}
    </div>
  );
}
