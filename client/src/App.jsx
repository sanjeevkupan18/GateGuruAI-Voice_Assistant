// PATH: client/src/App.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import StatusBar from "./components/StatusBar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import InputBar from "./components/InputBar.jsx";
import { sendMessage, fetchHistory, clearHistory } from "./services/api.js";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [branch, setBranch] = useState("CSE");
  const [status, setStatus] = useState("idle");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchHistory()
      .then((res) => {
        if (res.data?.messages?.length) {
          setMessages(
            res.data.messages.map((m) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            })),
          );
          if (res.data.branch) setBranch(res.data.branch);
        } else {
          pushWelcome();
        }
      })
      .catch(() => pushWelcome());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function pushWelcome() {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm GateGuru AI, your AI assistant for everything about the GATE exam. Ask me about syllabus, important topics, eligibility, study tips, or PSU jobs. You can type or use your voice!",
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-IN";
    utt.rate = 0.92;
    utt.pitch = 1.05;
    utt.onstart = () => setStatus("speaking");
    utt.onend = () => setStatus("idle");
    utt.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utt);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback(
    async (text) => {
      if (!text.trim()) return;
      stopSpeaking();
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);
      setStatus("thinking");
      try {
        const res = await sendMessage(text.trim(), branch);
        const reply = res.data.reply;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
            timestamp: new Date().toISOString(),
          },
        ]);
        speak(reply);
      } catch (err) {
        const msg =
          err.response?.data?.error ||
          "Something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: msg,
            timestamp: new Date().toISOString(),
            isError: true,
          },
        ]);
        setStatus("idle");
      }
    },
    [branch, speak, stopSpeaking],
  );

  const handleClear = useCallback(async () => {
    stopSpeaking();
    await clearHistory().catch(() => {});
    pushWelcome();
  }, [stopSpeaking]);

  return (
    <div className="relative isolate flex w-full max-w-[1280px] h-[92vh] min-h-[640px] p-3 sm:p-4 lg:p-6 mt-4 sm:mt-6 lg:mt-8">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[32px]
        "
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.92),rgba(2,6,23,0.82)_35%,rgba(15,23,42,0.75)_68%,rgba(15,23,42,0.92)_100%)]" />
      </div>

      <div
        className={`
        relative w-full grid
        grid-rows-[56px_1fr]
        border border-white/10
        rounded-[28px] overflow-hidden
        bg-slate-950/70 backdrop-blur-2xl
        shadow-[0_28px_80px_rgba(2,6,23,0.68)]
        transition-all duration-200
        ${sidebarOpen ? "grid-cols-[280px_1fr]" : "grid-cols-[0px_1fr]"}
      `}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onClear={handleClear}
        />
        <Sidebar
          branch={branch}
          onBranchChange={setBranch}
          onQuickPrompt={handleSubmit}
          isOpen={sidebarOpen}
        />
        <main className="flex flex-col overflow-hidden bg-slate-950/55 col-start-2">
          <StatusBar status={status} onStopSpeaking={stopSpeaking} />
          <ChatWindow
            messages={messages}
            status={status}
            bottomRef={bottomRef}
          />
          <InputBar
            status={status}
            setStatus={setStatus}
            onSubmit={handleSubmit}
          />
        </main>
      </div>
    </div>
  );
}
