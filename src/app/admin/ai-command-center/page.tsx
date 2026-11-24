"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  ShieldCheck,
  ShieldAlert,
  Mic,
  MicOff,
  CheckCircle2,
  Clock,
  Send,
  Zap,
  TrendingUp,
  FileText,
  Palette,
  Share2,
  MessageSquare,
  BarChart3,
  Users,
  AlertTriangle,
  Play,
  Pause,
  ExternalLink,
  ChevronRight,
  Layers,
  Award,
} from "lucide-react";

export default function AiCommandCenterPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [approvalsCount, setApprovalsCount] = useState(0);
  const [executingTask, setExecutingTask] = useState<string | null>(null);
  const [executionResult, setExecutionResult] = useState<any>(null);

  // Voice Assistant state
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceResponse, setVoiceResponse] = useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);

  // Custom task prompt state
  const [customPrompt, setCustomPrompt] = useState("");

  const fetchData = async () => {
    try {
      const [empRes, secRes, appRes] = await Promise.all([
        fetch("/api/admin/ai/employees"),
        fetch("/api/admin/ai/security"),
        fetch("/api/admin/ai/approvals"),
      ]);

      const empData = await empRes.json();
      const secData = await secRes.json();
      const appData = await appRes.json();

      if (empData.employees) setEmployees(empData.employees);
      if (secData.securityStatus) setIsLocked(secData.securityStatus.isEmergencyLockdown);
      if (appData.approvals) {
        const pending = appData.approvals.filter((a: any) => a.status === "PENDING").length;
        setApprovalsCount(pending);
      }
    } catch (e) {
      console.error("Failed to load command center data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEmployeeStatus = async (code: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    try {
      await fetch("/api/admin/ai/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, status: newStatus }),
      });
      fetchData();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleEmergencyLockdownToggle = async () => {
    const action = isLocked ? "LIFT_LOCKDOWN" : "EMERGENCY_LOCKDOWN";
    if (!isLocked && !confirm("क्या आप सचमुच सभी AI कर्मचारियों का काम तुरंत रोकना चाहते हैं? (Trigger Emergency Lockdown?)")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/ai/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLocked(data.isEmergencyLockdown);
        fetchData();
      }
    } catch (e) {
      alert("Error toggling lockdown");
    }
  };

  const handleExecuteAction = async (actionType: string, promptText?: string) => {
    if (isLocked) {
      alert("सिस्टम इमरजेंसी लॉकडाउन में है! कृपया पहले सिक्योरिटी पैनल से लॉकडाउन हटाएं।");
      return;
    }

    setExecutingTask(actionType);
    setExecutionResult(null);

    try {
      const res = await fetch("/api/admin/ai/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionType,
          prompt: promptText || customPrompt,
          productSlug: "360-rotating-kitchen-faucet-extender",
          platform: "INSTAGRAM",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setExecutionResult(data);
        fetchData();
      } else {
        alert(data.error || "Action execution failed");
      }
    } catch (err: any) {
      alert("Error executing AI workflow");
    } finally {
      setExecutingTask(null);
    }
  };

  // Speech Recognition (Bilingual Hindi & English) with Robust Continuous Listening
  const handleVoiceListen = async () => {
    if (typeof window === "undefined") return;

    // If already listening, stop it cleanly
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("आपके ब्राउज़र में आवाज़ पहचान (Web Speech API) उपलब्ध नहीं है। कृपया Google Chrome या Microsoft Edge का उपयोग करें।");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "hi-IN"; // Supports Hindi & English mix
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 1;

      let speechCaptured = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceTranscript("");
        setVoiceResponse("🎙️ माइक चालू है... कृपया अपना निर्देश बोलें (Listening...)");
      };

      recognition.onresult = async (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          speechCaptured = true;
          setVoiceTranscript(currentTranscript);
        }

        const isFinal = event.results[event.results.length - 1].isFinal;
        if (isFinal && currentTranscript.trim()) {
          try {
            recognition.stop();
          } catch (e) {}
          setIsListening(false);
          setVoiceResponse("🤖 AI Manager निर्देश प्रोसेस कर रहा है...");

          try {
            const res = await fetch("/api/admin/ai/voice", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ transcript: currentTranscript }),
            });
            const data = await res.json();
            if (data.success) {
              setVoiceResponse(data.aiResponse);
              if (data.actionType === "EMERGENCY_LOCKDOWN") {
                handleEmergencyLockdownToggle();
              } else {
                handleExecuteAction(data.actionType, currentTranscript);
              }
            } else {
              setVoiceResponse("आदेश प्रोसेस किया गया। कृपया Approval Center देखें।");
            }
          } catch (e) {
            setVoiceResponse("AI Manager से कनेक्ट करने में त्रुटि हुई।");
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === "not-allowed") {
          setIsListening(false);
          alert("⚠️ ब्राउज़र ने माइक एक्सेस ब्लॉक कर दिया है!\n\nकृपया एड्रेस बार में 🔒 लॉक या माइक आइकन पर क्लिक करके 'Allow Microphone' चुनें।");
        } else if (event.error === "no-speech") {
          // If no speech detected yet, do not kill the listening state immediately if still waiting
          setVoiceResponse("🎙️ आवाज़ सुनाई नहीं दी, कृपया माइक के पास साफ़ आवाज़ में बोलें...");
        } else if (event.error === "audio-capture") {
          setIsListening(false);
          alert("⚠️ कोई माइक्रोफ़ोन नहीं मिला। कृपया अपना हेडफ़ोन या माइक चेक करें।");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
      alert("माइक शुरू करने में समस्या आई: " + err.message);
    }
  };

  const getEmployeeIcon = (code: string) => {
    switch (code) {
      case "MANAGER":
        return <Bot className="w-5 h-5 text-white" />;
      case "MARKETING_MGR":
        return <TrendingUp className="w-5 h-5 text-white" />;
      case "CONTENT_WRITER":
        return <FileText className="w-5 h-5 text-white" />;
      case "GRAPHIC_DESIGNER":
        return <Palette className="w-5 h-5 text-white" />;
      case "SOCIAL_MGR":
        return <Share2 className="w-5 h-5 text-white" />;
      case "SUPPORT_MGR":
        return <MessageSquare className="w-5 h-5 text-white" />;
      case "BUSINESS_ANALYST":
        return <BarChart3 className="w-5 h-5 text-white" />;
      default:
        return <Users className="w-5 h-5 text-white" />;
    }
  };

  const getEmployeeColor = (code: string) => {
    switch (code) {
      case "MANAGER":
        return "bg-blue-600";
      case "MARKETING_MGR":
        return "bg-indigo-600";
      case "CONTENT_WRITER":
        return "bg-emerald-600";
      case "GRAPHIC_DESIGNER":
        return "bg-amber-600";
      case "SOCIAL_MGR":
        return "bg-purple-600";
      case "SUPPORT_MGR":
        return "bg-teal-600";
      case "BUSINESS_ANALYST":
        return "bg-rose-600";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Emergency Lockdown Bar */}
      <div className={`p-6 rounded-3xl text-white shadow-xl transition-all relative overflow-hidden ${
        isLocked
          ? "bg-gradient-to-r from-red-900 via-red-800 to-red-950 border-2 border-red-500"
          : "bg-gradient-to-r from-[#101B35] via-[#1E293B] to-[#101B35] border border-blue-900"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AVNIVO Autonomous Workforce Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO AI COMMAND CENTER</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Owner-governed company automation system. 1 AI Chief Manager and 6 AI Employees collaborating under strict Human-in-the-Loop approval rules.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Bilingual Voice Assistant Button */}
            <button
              onClick={handleVoiceListen}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition-all flex items-center gap-2 ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
              title="Speak in Hindi or English (बोलकर निर्देश दें)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-accent" />}
              <span>{isListening ? "सुन रहे हैं... (Listening)" : "Voice Command (आवाज़ से निर्देश)"}</span>
            </button>

            {/* Approvals Quick Pill */}
            <Link
              href="/admin/ai-command-center/approvals"
              className="px-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2 relative"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approval Center</span>
              {approvalsCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                  {approvalsCount} Pending
                </span>
              )}
            </Link>

            {/* Emergency Lockdown Switch */}
            <button
              onClick={handleEmergencyLockdownToggle}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center gap-2 ${
                isLocked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isLocked ? "LIFT LOCKDOWN" : "EMERGENCY LOCKDOWN"}</span>
            </button>
          </div>
        </div>

        {/* Live Lockdown Notice */}
        {isLocked && (
          <div className="mt-4 p-3 bg-red-950/80 border border-red-500/50 rounded-2xl flex items-center gap-3 text-xs text-red-200 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>
              <strong>EMERGENCY LOCKDOWN ACTIVE:</strong> All 7 AI Employees have been halted. No social posts, marketing campaigns, or operations can proceed until the Owner lifts lockdown.
            </span>
          </div>
        )}

        {/* Voice Transcript Display */}
        {(isListening || voiceTranscript || voiceResponse) && (
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-1.5 text-xs animate-fade-in">
            {voiceTranscript && (
              <p className="text-gray-200">
                🎙️ <strong>आपने कहा (You said):</strong> &quot;{voiceTranscript}&quot;
              </p>
            )}
            {voiceResponse && (
              <p className="text-accent font-semibold">
                🤖 <strong>AI Manager उत्तर:</strong> {voiceResponse}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <Link
          href="/admin/ai-command-center"
          className="px-4 py-2 bg-primary text-white font-bold rounded-xl shadow-sm shrink-0"
        >
          Overview &amp; Workforce
        </Link>
        <Link
          href="/admin/ai-command-center/approvals"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <span>Pending Approvals</span>
          {approvalsCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {approvalsCount}
            </span>
          )}
        </Link>
        <Link
          href="/admin/ai-command-center/security"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span>Owner Security Panel</span>
        </Link>
        <Link
          href="/admin/ai-command-center/social"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5 text-purple-600" />
          <span>10 Social Channels</span>
        </Link>
        <Link
          href="/admin/ai-command-center/voice"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Mic className="w-3.5 h-3.5 text-amber-500" />
          <span>Voice Laboratory</span>
        </Link>
        <Link
          href="/admin/ai-command-center/support"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
          <span>Customer Desk</span>
        </Link>
        <Link
          href="/admin/ai-command-center/analytics"
          className="px-4 py-2 bg-white hover:bg-gray-50 text-charcoal border border-gray-200 font-bold rounded-xl shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5 text-rose-600" />
          <span>Business Intelligence</span>
        </Link>
      </div>

      {/* 3. One-Click Command Dispatcher */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-primary font-display flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>One-Click AI Task Dispatcher (त्वरित आदेश)</span>
            </h3>
            <p className="text-xs text-gray-500">
              Select an automated workflow or type custom instructions for your AI employees:
            </p>
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleExecuteAction("GENERATE_CAMPAIGN")}
            disabled={!!executingTask}
            className="p-4 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                📈
              </span>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                Full Campaign
              </span>
            </div>
            <h4 className="font-bold text-xs text-primary group-hover:text-indigo-600 transition-colors">
              Viral Multi-Channel Campaign
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-2">
              Marketing strategy, copy, graphic creatives &amp; scripts across 7 platforms.
            </p>
          </button>

          <button
            onClick={() => handleExecuteAction("GENERATE_SOCIAL_POST")}
            disabled={!!executingTask}
            className="p-4 rounded-2xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all text-left space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                📱
              </span>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                Social Media
              </span>
            </div>
            <h4 className="font-bold text-xs text-primary group-hover:text-purple-600 transition-colors">
              Draft Instagram &amp; Facebook Post
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-2">
              High-converting caption, tags, and product preview card for approval.
            </p>
          </button>

          <button
            onClick={() => handleExecuteAction("GENERATE_BUSINESS_REPORT")}
            disabled={!!executingTask}
            className="p-4 rounded-2xl border border-gray-200 hover:border-rose-500 hover:bg-rose-50/50 transition-all text-left space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                📊
              </span>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                Analytics
              </span>
            </div>
            <h4 className="font-bold text-xs text-primary group-hover:text-rose-600 transition-colors">
              Daily Sales &amp; Catalog Audit
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-2">
              Real-time database audit of products, clicks, merchants, and revenue opportunities.
            </p>
          </button>

          <button
            onClick={() => handleExecuteAction("GENERATE_CAMPAIGN", "Festival Special Offer & Deals Push")}
            disabled={!!executingTask}
            className="p-4 rounded-2xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                🎁
              </span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                Deals Alert
              </span>
            </div>
            <h4 className="font-bold text-xs text-primary group-hover:text-amber-600 transition-colors">
              Under ₹299 Flash Deals Push
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-2">
              Loot deals copy for WhatsApp and Telegram channel broadcasts.
            </p>
          </button>
        </div>

        {/* Custom Directive Input */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type custom instructions for AI Manager (उदा. Kitchen category के लिए नए प्रोडक्ट्स प्रमोट करो)..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
          />
          <button
            onClick={() => handleExecuteAction("CUSTOM", customPrompt)}
            disabled={!customPrompt.trim() || !!executingTask}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Manager</span>
          </button>
        </div>

        {/* Execution Feedback Banner */}
        {executingTask && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs text-blue-900 animate-pulse">
            <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin shrink-0" />
            <span>AI Manager is coordinating with Marketing, Content, and Graphic Design employees...</span>
          </div>
        )}

        {executionResult && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Task Successfully Generated &amp; Sent to Approval Center!</span>
              </span>
              <Link
                href="/admin/ai-command-center/approvals"
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] flex items-center gap-1"
              >
                <span>View &amp; Approve Now</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {executionResult.message}
            </p>
          </div>
        )}
      </div>

      {/* 4. AI Workforce Roster (All 7 Employees) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary font-display">
              👥 AI Workforce Hierarchy (7 Active Agents)
            </h3>
            <p className="text-xs text-gray-500">
              Each AI Employee possesses distinct capabilities and reports directly to the Owner through the AI Manager:
            </p>
          </div>
          <span className="text-xs text-gray-400 font-semibold">
            Status: {isLocked ? "🔴 All Locked" : "🟢 7 Online"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employees.map((emp) => {
            const isActive = emp.status === "ACTIVE" && !isLocked;
            return (
              <div
                key={emp.code}
                className={`bg-white rounded-2xl p-5 border shadow-sm transition-all flex flex-col justify-between space-y-4 ${
                  emp.code === "MANAGER"
                    ? "border-blue-300 ring-2 ring-blue-500/20 lg:col-span-2 xl:col-span-1"
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${getEmployeeColor(emp.code)} flex items-center justify-center shadow-md shrink-0`}>
                        {getEmployeeIcon(emp.code)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-primary">{emp.name}</h4>
                        <span className="text-[10px] text-gray-500 block leading-tight font-medium">
                          {emp.roleTitle}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleEmployeeStatus(emp.code, emp.status)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                      title={isActive ? "Pause Worker" : "Activate Worker"}
                    >
                      {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                    {emp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    <span>Tasks: <strong className="text-charcoal">{emp.tasksCompleted}</strong></span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {isActive ? "ACTIVE" : isLocked ? "LOCKED" : "PAUSED"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
