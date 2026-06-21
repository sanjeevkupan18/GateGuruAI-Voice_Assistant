// PATH: client/src/components/MessageBubble.jsx
import React from "react";

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`group flex items-start gap-2.5 animate-fadeUp ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`
        w-7 h-7 rounded-full flex-shrink-0
        flex items-center justify-center
        text-xs font-semibold ring-2 ring-white/10 shadow-sm
        ${
          isUser
            ? "bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950"
            : "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
        }
      `}
        aria-hidden="true"
      >
        {isUser ? "ST" : "G"}
      </div>

      {/* Bubble + meta */}
      <div
        className={`flex flex-col max-w-[70%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`
          px-3.5 py-2.5 text-base leading-relaxed word-break
          shadow-sm
          ${
            isUser
              ? "bg-gradient-to-br from-violet-500 via-violet-600 to-fuchsia-600 text-white rounded-[14px] rounded-br-[4px] shadow-[0_12px_30px_rgba(168,85,247,0.24)] ring-1 ring-white/10"
              : message.isError
                ? "bg-rose-500/10 text-rose-200 border border-rose-400/20 rounded-[14px] rounded-tl-[4px]"
                : "bg-white/5 text-slate-100 border border-white/10 rounded-[14px] rounded-tl-[4px] backdrop-blur"
          }
        `}
        >
          {message.content}
        </div>
        <p
          className={`text-xs text-slate-400 mt-1 px-1 ${isUser ? "text-right" : ""}`}
        >
          {isUser ? "You" : "GateGuru AI"} · {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
