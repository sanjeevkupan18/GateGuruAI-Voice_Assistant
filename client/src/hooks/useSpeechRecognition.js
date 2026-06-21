// PATH: client/src/hooks/useSpeechRecognition.js
import { useState, useRef, useCallback } from "react";

export default function useSpeechRecognition({ onResult, onError }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const startListening = useCallback(() => {
    if (!isSupported) {
      onError?.(
        "Speech recognition is not supported. Please use Chrome or Edge.",
      );
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      const t = e.results[0][0].transcript;
      if (t.trim()) onResult?.(t.trim());
    };
    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error === "not-allowed")
        onError?.(
          "Microphone access denied. Please allow mic access in browser settings.",
        );
      else if (e.error === "no-speech")
        onError?.("No speech detected. Please try again.");
      else onError?.(`Voice error: ${e.error}`);
    };
    recognition.start();
    recognitionRef.current = recognition;
  }, [isSupported, onResult, onError]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, isSupported, startListening, stopListening };
}
