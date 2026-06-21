// PATH: client/src/components/Sidebar.jsx
import React from "react";

const BRANCHES = ["CSE", "ECE", "ME", "CE", "EE", "IN"];

const QUICK_PROMPTS = [
  { icon: "📋", label: "GATE syllabus overview" },
  { icon: "⭐", label: "Important topics" },
  { icon: "📅", label: "Exam pattern & marks" },
  { icon: "📊", label: "Cutoffs & scores" },
  { icon: "🏢", label: "PSU recruitment" },
  { icon: "🗓️", label: "Study plan for 3 months" },
];

export default function Sidebar({
  branch,
  onBranchChange,
  onQuickPrompt,
  isOpen,
}) {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Sidebar"
      className="
        row-start-2 col-start-1
        bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95
        border-r border-white/10
        backdrop-blur-xl
        overflow-y-auto
        flex flex-col
        pb-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]
      "
    >
      {/* Branch selector */}
      <p
        className="
        text-2xs font-medium tracking-widest uppercase
        text-slate-400 px-3.5 pt-4 pb-1.5
      "
      >
        Your branch
      </p>

      <div className="grid grid-cols-2 gap-1.5 px-3.5 pb-3">
        {BRANCHES.map((b) => (
          <button
            key={b}
            onClick={() => onBranchChange(b)}
            aria-pressed={branch === b}
            className={`
              py-[9px] rounded-[14px] text-sm text-center
              border transition-all duration-150 shadow-sm
              ${
                branch === b
                  ? "bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950 border-cyan-300/20 font-semibold shadow-[0_10px_24px_rgba(34,211,238,0.16)]"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              }
            `}
          >
            {b}
          </button>
        ))}
      </div>

      <hr className="border-t border-white/10 mx-3.5 my-1" />

      {/* Quick prompts */}
      <p
        className="
        text-2xs font-medium tracking-widest uppercase
        text-slate-400 px-3.5 pt-3 pb-1.5
      "
      >
        Quick ask
      </p>

      <div className="flex flex-col gap-0.5 px-2.5 pb-3">
        {QUICK_PROMPTS.map((q) => (
          <button
            key={q.label}
            onClick={() => onQuickPrompt(q.label)}
            className="
              flex items-center gap-2
              px-2.5 py-[9px] rounded-[14px]
              text-sm text-slate-300 text-left
              hover:bg-white/10 hover:text-white
              transition-all duration-150
            "
          >
            <span className="text-sm" aria-hidden="true">
              {q.icon}
            </span>
            {q.label}
          </button>
        ))}
      </div>

      <hr className="border-t border-white/10 mx-3.5 my-1" />

      {/* Tip card */}
      <p
        className="
        text-2xs font-medium tracking-widest uppercase
        text-slate-400 px-3.5 pt-3 pb-1.5
      "
      >
        Did you know
      </p>
      <div
        className="
        mx-3.5 p-3 rounded-[16px]
        bg-gradient-to-br from-violet-500/10 via-slate-900/80 to-cyan-500/10
        border border-white/10
        text-xs text-slate-200 leading-relaxed
        shadow-lg shadow-violet-950/20
      "
      >
        GATE scores are valid for 3 years and accepted by 900+ PSUs and
        universities.
      </div>
    </aside>
  );
}
