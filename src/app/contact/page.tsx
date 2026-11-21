"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("GENERAL");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, type, subject, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Thank you. Your inquiry has been submitted.");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Failed to submit inquiry.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Contact Us & Help Center
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Have a question about a price comparison, affiliate disclosure, or need support? We&apos;re here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-primary font-display mb-4">
            Send Us a Message
          </h2>

          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Rao"
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Inquiry Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary bg-white"
                >
                  <option value="GENERAL">General Shopping Inquiry</option>
                  <option value="PRICE_CORRECTION">Report Outdated Price / Link Issue</option>
                  <option value="AFFILIATE_DISCLOSURE">Affiliate Relationship Inquiry</option>
                  <option value="GRIEVANCE">Consumer Protection Grievance</option>
                  <option value="PARTNERSHIP">Merchant / Brand Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Your Message *</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide specific details so our team can help you efficiently..."
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Submitting..." : "Send Message"}</span>
            </button>
          </form>
        </div>

        {/* Office & Channels Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-gray-200/80 space-y-6">
            <h3 className="font-bold text-base text-primary font-display">
              Support Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Customer Support:</span>
                  <a href="mailto:support@avnivo.com" className="text-secondary hover:underline">
                    support@avnivo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Help Desk Line:</span>
                  <span className="text-gray-600">[+91 80 1234 5678 Placeholder]</span>
                  <span className="text-gray-400 block text-[11px]">Mon to Fri: 10:00 AM – 6:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary block">Registered Office:</span>
                  <span className="text-gray-600">
                    [Level 4, Cyber City / Outer Ring Road, Bengaluru, Karnataka, India - 560103 Placeholder]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-primary font-display">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-primary">How do I track an order I made on Amazon?</h4>
                <p className="text-gray-500 mt-0.5">
                  Because purchases are executed directly on Amazon, please log into your Amazon India account under &quot;Your Orders&quot; to view live courier tracking.
                </p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <h4 className="font-bold text-primary">Does AVNIVO charge extra for using its price comparison?</h4>
                <p className="text-gray-500 mt-0.5">
                  Zero. AVNIVO is completely free for all shoppers. We earn small affiliate fees directly from merchant marketing budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
