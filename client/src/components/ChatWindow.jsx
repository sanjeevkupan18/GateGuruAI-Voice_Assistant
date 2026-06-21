// PATH: client/src/components/ChatWindow.jsx
import React from "react";
import MessageBubble from "./MessageBubble.jsx";

export default function ChatWindow({ messages, status, bottomRef }) {
  return (
    <div
      role="log"
      aria-label="Conversation"
      className="
        flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4
        bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.92),rgba(2,6,23,0.88)_42%,rgba(15,23,42,0.94)_100%)]
      "
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}

      {/* Typing indicator */}
      {status === "thinking" && (
        <div className="flex items-start gap-2.5">
          <div
            className="
            w-7 h-7 rounded-full flex-shrink-0
            bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950
            flex items-center justify-center
            text-xs font-black shadow-sm ring-2 ring-white/10
          "
            aria-hidden="true"
          >
            G
          </div>
          <div
            aria-label="AI is typing"
            className="
              flex items-center gap-1.5
              bg-white/5 border border-white/10
              rounded-[14px] rounded-tl-[4px]
              px-4 py-3
              shadow-sm backdrop-blur
            "
          >
            {[0, 180, 360].map((delay, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyan-300 inline-block animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
