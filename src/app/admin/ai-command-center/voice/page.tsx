"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Bot,
  ShieldAlert,
  Send,
  Zap,
} from "lucide-react";

export default function VoiceAssistantLaboratoryPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [recognizedAction, setRecognizedAction] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);
  const [manualInput, setManualInput] = useState("");

  const sampleCommands = [
    { text: "Kitchen category ke liye nayi campaign banao", lang: "Hindi", action: "GENERATE_CAMPAIGN" },
    { text: "Instagram aur Facebook ke liye viral post draft karo", lang: "Hindi", action: "GENERATE_SOCIAL_POST" },
    { text: "Aaj ki business report aur catalog audit generate karo", lang: "Hindi", action: "GENERATE_BUSINESS_REPORT" },
    { text: "Under 299 ke flash deals alert WhatsApp aur Telegram par bhejo", lang: "Hindi", action: "GENERATE_CAMPAIGN" },
    { text: "Sab AI workers ko pause karo, emergency lockdown lagao", lang: "Hindi", action: "EMERGENCY_LOCKDOWN" },
  ];

  const handleStartListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Web Speech API. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // Handles Hindi and Indian English seamlessly
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setAiResponse(null);
      setRecognizedAction(null);
    };

    recognition.onresult = async (event: any) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      setIsListening(false);
      processCommand(speechText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processCommand = async (text: string) => {
    setExecuting(true);
    try {
      const res = await fetch("/api/admin/ai/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });

      const data = await res.json();
      if (data.success) {
        setAiResponse(data.aiResponse);
        setRecognizedAction(data.actionType);

        // Execute action automatically if not lockdown
        if (data.actionType === "EMERGENCY_LOCKDOWN") {
          await fetch("/api/admin/ai/security", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "EMERGENCY_LOCKDOWN" }),
          });
        } else {
          await fetch("/api/admin/ai/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              actionType: data.actionType,
              prompt: text,
              productSlug: "360-rotating-kitchen-faucet-extender",
            }),
          });
        }
      } else {
        setAiResponse("Command processed by AI Manager. Please check Approvals.");
      }
    } catch (e) {
      setAiResponse("Failed to connect to AI Manager.");
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#101B35] to-[#1E293B] text-white p-6 rounded-3xl shadow-xl border border-blue-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <Mic className="w-3.5 h-3.5" />
              <span>Bilingual Voice Recognition Engine (हिंदी / English)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO Voice AI Command Center</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Control your entire 7-agent AI workforce with your natural voice. Speak commands in Hindi or English, and the AI Chief Manager executes instantly.
            </p>
          </div>

          <Link
            href="/admin/ai-command-center"
            className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </Link>
        </div>
      </div>

      {/* Voice Trigger Stage */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6">
        <div className="max-w-md mx-auto space-y-3">
          {/* Big Interactive Mic Button */}
          <button
            onClick={handleStartListening}
            className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center transition-all shadow-2xl relative ${
              isListening
                ? "bg-red-500 text-white animate-pulse scale-110 ring-8 ring-red-200"
                : "bg-gradient-to-br from-primary to-blue-900 text-white hover:scale-105 hover:shadow-blue-900/30 ring-4 ring-blue-100"
            }`}
            title="Click to speak (बोलने के लिए क्लिक करें)"
          >
            {isListening ? (
              <MicOff className="w-12 h-12 animate-bounce" />
            ) : (
              <Mic className="w-12 h-12 text-accent" />
            )}
          </button>

          <h3 className="font-bold text-base text-primary font-display">
            {isListening ? "🎙️ आपकी आवाज़ सुन रहे हैं... (Listening)" : "माइक दबाकर बोलें (Tap Mic & Speak)"}
          </h3>
          <p className="text-xs text-gray-500">
            आप हिंदी या English में बोल सकते हैं। उदा. &quot;Kitchen category ke liye campaign banao&quot;
          </p>
        </div>

        {/* Audio Wave Simulation when listening */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 py-2">
            {[40, 70, 30, 90, 50, 80, 20, 95, 60, 40].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-red-500 rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}

        {/* Live Transcript & AI Execution Output */}
        {(transcript || aiResponse || executing) && (
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-5 border border-gray-200 text-left space-y-3 animate-fade-in text-xs">
            {transcript && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  You Spoke (आपने कहा):
                </span>
                <p className="text-sm font-bold text-primary font-sans">
                  &quot;{transcript}&quot;
                </p>
              </div>
            )}

            {executing && (
              <div className="flex items-center gap-2 text-secondary font-bold py-2">
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <span>AI Manager is delegating to workers and routing to Approval Center...</span>
              </div>
            )}

            {aiResponse && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <span>AI Chief Manager Response</span>
                  </div>
                  {recognizedAction && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-200 text-emerald-900">
                      {recognizedAction}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed font-sans">
                  {aiResponse}
                </p>
                <div className="pt-1">
                  <Link
                    href="/admin/ai-command-center/approvals"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
                  >
                    View generated task in Approval Center →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Text Fallback Input */}
        <div className="max-w-xl mx-auto pt-4 border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualInput.trim()) {
                setTranscript(manualInput);
                processCommand(manualInput);
                setManualInput("");
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Or type voice text manually if mic is unavailable..."
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              disabled={!manualInput.trim() || executing}
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Voice Commands */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-primary font-display flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-secondary" />
          <span>Try These Voice Commands (उदाहरण वाक्य जिन्हें आप बोल सकते हैं)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {sampleCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(cmd.text);
                processCommand(cmd.text);
              }}
              className="p-3.5 rounded-2xl border border-gray-200 hover:border-secondary hover:bg-blue-50/40 text-left transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-secondary uppercase">
                  {cmd.action}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold">
                  {cmd.lang}
                </span>
              </div>
              <p className="font-bold text-primary text-xs font-sans group-hover:text-secondary">
                &ldquo;{cmd.text}&rdquo;
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
