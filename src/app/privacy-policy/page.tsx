import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | AVNIVO",
  description: "Privacy policy complying with India's Digital Personal Data Protection Act 2023 (DPDP Act).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            1. Information We Collect
          </h2>
          <p>
            AVNIVO respects your privacy. When you register an account, we collect your name, email address, optional mobile number, and encrypted password hash. When you browse, we collect anonymized diagnostic data, device type, and hashed IP identifiers solely for fraud prevention and click verification.
          </p>
          <p>
            <strong>Payment Data:</strong> AVNIVO does <em>not</em> collect or store your debit/credit card numbers or UPI PINs for affiliate links. Transactions are executed exclusively on authorized third-party merchant platforms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            2. Purpose of Data Processing
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Syncing your saved Wishlist and Compare items across devices.</li>
            <li>Transmitting requested price drop and deal alerts via email.</li>
            <li>Logging affiliate click conversions and auditing valid referral traffic.</li>
            <li>Responding to customer support tickets and regulatory inquiries.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            3. Data Retention & Deletion
          </h2>
          <p>
            You have the right to request deletion of your account and associated personal data at any time under the DPDP Act 2023. You can initiate this through your account dashboard or by writing to{" "}
            <a href="mailto:privacy@avnivo.com" className="text-secondary underline font-semibold">
              privacy@avnivo.com
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            4. Business Registration & Official Placeholders
          </h2>
          <div className="bg-surface p-4 rounded-xl border border-gray-200 text-xs space-y-1">
            <p><strong>Entity Name:</strong> [AVNIVO Technologies Private Limited / Operating Entity Name Placeholder]</p>
            <p><strong>Corporate Identification Number (CIN):</strong> [U72900XX2025PTCXXXXXX Placeholder]</p>
            <p><strong>Registered Office:</strong> [Level 4, Cyber City / Outer Ring Road, Bengaluru, Karnataka, India - 560103 Placeholder]</p>
            <p><strong>Contact Email:</strong> legal@avnivo.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
