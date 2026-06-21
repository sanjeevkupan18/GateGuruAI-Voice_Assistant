// PATH: client/src/components/InputBar.jsx
import React, { useState, useCallback } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition.js";

export default function InputBar({ status, setStatus, onSubmit }) {
  const [text, setText] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const isThinking = status === "thinking";

  const { isListening, isSupported, startListening, stopListening } =
    useSpeechRecognition({
      onResult: (transcript) => {
        setText(transcript);
        setStatus("idle");
      },
      onError: (msg) => {
        setVoiceError(msg);
        setStatus("idle");
        setTimeout(() => setVoiceError(""), 4000);
      },
    });

  const handleMic = useCallback(() => {
    if (isThinking) return;
    if (isListening) {
      stopListening();
      setStatus("idle");
    } else {
      setVoiceError("");
      setStatus("listening");
      startListening();
    }
  }, [isListening, isThinking, startListening, stopListening, setStatus]);

  const handleSend = useCallback(() => {
    if (!text.trim() || isThinking) return;
    onSubmit(text.trim());
    setText("");
  }, [text, isThinking, onSubmit]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-5 py-4 border-t border-white/10 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 backdrop-blur-xl">
      {/* Voice error toast */}
      {voiceError && (
        <div
          role="alert"
          className="
            mb-2 px-3 py-1.5 rounded-md text-xs
            bg-rose-500/10 text-rose-300 border border-rose-400/20
            shadow-sm
          "
        >
          {voiceError}
        </div>
      )}

      <div
        className="
          flex items-center gap-2 p-2 rounded-[24px]
          bg-white/5 border border-white/10 shadow-[0_16px_32px_rgba(2,6,23,0.42)]
        "
      >
        {/* Mic button */}
        {isSupported && (
          <button
            onClick={handleMic}
            disabled={isThinking}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            aria-pressed={isListening}
            className={`
              w-[38px] h-[38px] rounded-full flex-shrink-0
              flex items-center justify-center
              border transition-all duration-150 shadow-sm
              disabled:opacity-40 disabled:cursor-not-allowed
              ${
                isListening
                  ? "bg-rose-500/10 border-rose-400/20 text-rose-300 animate-micRing"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20"
              }
            `}
          >
            {isListening ? (
              /* Waveform bars */
              <span
                className="flex items-center gap-0.5 h-[18px]"
                aria-hidden="true"
              >
                {[
                  { h: "h-[5px]", delay: "0ms" },
                  { h: "h-[12px]", delay: "80ms" },
                  { h: "h-[18px]", delay: "150ms" },
                  { h: "h-[10px]", delay: "200ms" },
                  { h: "h-[15px]", delay: "50ms" },
                  { h: "h-[7px]", delay: "250ms" },
                ].map((bar, i) => (
                  <span
                    key={i}
                    className={`w-[3px] ${bar.h} bg-rose-300 rounded-sm animate-wave`}
                    style={{ animationDelay: bar.delay }}
                  />
                ))}
              </span>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0014 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            )}
          </button>
        )}

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          disabled={isListening || isThinking}
          placeholder={
            isListening ? "Listening..." : "Ask anything about GATE exam..."
          }
          aria-label="Type your question"
          className="
            flex-1 h-[38px] px-4
            rounded-full text-base
            bg-transparent text-slate-100
            border border-transparent
            placeholder:text-slate-500
            outline-none
            focus:ring-0
            disabled:opacity-50
            transition-colors
          "
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!text.trim() || isThinking}
          aria-label="Send message"
          className="
            w-[38px] h-[38px] rounded-full flex-shrink-0
            flex items-center justify-center
            bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950
            hover:from-violet-400 hover:to-cyan-300
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-md transition-all
          "
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
