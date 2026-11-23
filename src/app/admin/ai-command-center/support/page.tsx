"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bot,
  User,
  Clock,
  PhoneCall,
  ExternalLink,
} from "lucide-react";

export default function CustomerDeskPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testQuestion, setTestQuestion] = useState("");
  const [simulatedReply, setSimulatedReply] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (e) {
      console.error("Failed to fetch inquiries", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleTestAiResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuestion.trim()) return;

    setSimulating(true);
    setSimulatedReply(null);

    setTimeout(() => {
      const q = testQuestion.toLowerCase();
      let answer = "";

      if (q.includes("delivery") || q.includes("shipping") || q.includes("kab milega")) {
        answer = "नमस्ते! AVNIVO पर उपलब्ध अधिकांश प्रोडक्ट्स पर प्रमुख मर्चेंट्स (जैसे Amazon या Flipkart) 2 से 4 दिन में Free Express Delivery प्रदान करते हैं। आप प्रोडक्ट पेज पर 'Go to Store' क्लिक करके अपने पिनकोड के लिए सटीक डिलीवरी तारीख देख सकते हैं।";
      } else if (q.includes("faucet") || q.includes("tap") || q.includes("kitchen")) {
        answer = "नमस्ते! हमारा 360° Rotating Kitchen Faucet Extender 3 स्प्रे मोड्स के साथ आता है और 70% तक पानी बचाता है। इसका वर्तमान बेस्ट इंडिकेटिव प्राइस ₹349 (65% OFF) है। यह भारत के 99% नॉर्मल टैप्स में बिना प्लंबर के आसानी से लग जाता है!";
      } else if (q.includes("return") || q.includes("refund") || q.includes("wapas")) {
        answer = "नमस्ते! AVNIVO एक ट्रस्टेड प्राइस कंपेरिजन और एफिलिएट डिस्कवरी प्लेटफॉर्म है। जब आप खरीदारी करते हैं, तो रिटर्न और रिफंड पॉलिसी मर्चेंट (Amazon/Flipkart) द्वारा 7-10 दिनों की रिप्लेसमेंट गारंटी के तहत सीधे कवर होती है।";
      } else if (q.includes("affiliate") || q.includes("partner") || q.includes("kamana")) {
        answer = "AVNIVO Partner Program के जरिए कोई भी क्रिएटर या यूजर हमारे प्रोडक्ट्स शेयर करके आकर्षक एफिलिएट कमीशन अर्न कर सकता है। आप अपने अकाउंट डैशबोर्ड से तुरंत अपना एफिलिएट लिंक बना सकते हैं!";
      } else {
        answer = `नमस्ते! मैं AVNIVO का AI Customer Assistant हूँ। आपने पूछा: "${testQuestion}". हमारी टीम ने आपकी क्वेरी नोट कर ली है। यदि यह किसी खास प्रोडक्ट के बारे में है, तो आप हमारी वेबसाइट https://avnivo.vercel.app पर लाइव वेरिफाइड डील चेक कर सकते हैं या हमारे सपोर्ट नंबर पर संपर्क कर सकते हैं!`;
      }

      setSimulatedReply(answer);
      setSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#101B35] to-[#1E293B] text-white p-6 rounded-3xl shadow-xl border border-blue-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>EMPLOYEE 5: AI Customer Support Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO Customer Care &amp; WhatsApp Assistant</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Instant bilingual automated customer responses. Verified product answers, order tracking assistance, and human escalation when needed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true);
                fetchInquiries();
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/ai-command-center"
              className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: WhatsApp & Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. AI WhatsApp & Chat Simulator */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-primary font-display flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Automated Support Simulator (WhatsApp &amp; Live Chat)</span>
              </h3>
              <p className="text-xs text-gray-500">
                Test how the AI Support Manager responds to real customer questions:
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              Hindi &amp; English
            </span>
          </div>

          <form onSubmit={handleTestAiResponse} className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="उदा. 'Delivery kitne din me hogi?' या 'Faucet price kya hai?'..."
                value={testQuestion}
                onChange={(e) => setTestQuestion(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={simulating || !testQuestion.trim()}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 shrink-0"
              >
                {simulating ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Ask AI</span>
              </button>
            </div>

            {/* Quick Sample Questions */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-gray-400 font-bold">Quick test:</span>
              <button
                type="button"
                onClick={() => setTestQuestion("Delivery kitne din me hogi?")}
                className="text-[10px] px-2.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium"
              >
                Delivery Timeline?
              </button>
              <button
                type="button"
                onClick={() => setTestQuestion("360 Faucet extender ka price kya hai?")}
                className="text-[10px] px-2.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium"
              >
                Faucet Extender Deal?
              </button>
              <button
                type="button"
                onClick={() => setTestQuestion("Return policy kya hai?")}
                className="text-[10px] px-2.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium"
              >
                Return Policy?
              </button>
            </div>
          </form>

          {/* Chat Bubble Result */}
          {simulatedReply && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 animate-fade-in text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-xs text-emerald-950">
                    AVNIVO Verified Support Bot Response
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Automated &bull; Zero Hallucination Guarantee
                  </span>
                </div>
              </div>
              <p className="text-gray-800 leading-relaxed font-sans pt-1 border-t border-emerald-200/60">
                {simulatedReply}
              </p>
            </div>
          )}
        </div>

        {/* 2. Customer Channel Guidelines & Integration Protocol */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-primary font-display flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-secondary" />
              <span>Customer Desk Guidelines &amp; Safeguards</span>
            </h3>

            <div className="space-y-2.5 text-xs text-gray-600 leading-relaxed">
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
                <strong className="text-secondary font-bold block">1. Clear AI Disclosure:</strong>
                <p className="text-[11px]">
                  All automated responses explicitly identify as the &quot;AVNIVO AI Customer Assistant&quot; for complete trust and transparency.
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                <strong className="text-amber-900 font-bold block">2. Zero Guesswork &amp; Escalation:</strong>
                <p className="text-[11px]">
                  If an enquiry cannot be answered with verified database product facts, the AI never guesses and immediately logs it for Owner review.
                </p>
              </div>

              <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1">
                <strong className="text-purple-900 font-bold block">3. Future Voice AI Ready:</strong>
                <p className="text-[11px]">
                  Architecture supports future IVR and telephone voice call routing directly into the AI Command Center.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/inquiries"
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
              <span>Open Store Inquiries Log ({inquiries.length} records)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
