import React from "react";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Grievance Redressal Mechanism | AVNIVO India",
  description: "Mandatory consumer grievance officer details per Consumer Protection (E-Commerce) Rules, 2020.",
};

export default function GrievanceRedressalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Compliance • Rule 5(2)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-primary font-display">
          Consumer Grievance Redressal Mechanism
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Consumer Protection (E-Commerce) Rules, 2020 & Information Technology Rules, 2021
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            Nodal Grievance Officer Details
          </h2>
          <p>
            In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the details of the designated Grievance Redressal Officer for AVNIVO are provided below:
          </p>

          <div className="bg-surface rounded-2xl p-6 border border-gray-200/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-400 block uppercase">Name & Designation:</span>
                <span className="font-bold text-primary text-sm">[Officer Name Placeholder]</span>
                <span className="text-gray-500 block">Nodal Grievance & Compliance Officer</span>
              </div>

              <div>
                <span className="font-bold text-gray-400 block uppercase">Dedicated Email:</span>
                <a href="mailto:grievance@avnivo.com" className="font-bold text-secondary text-sm underline">
                  grievance@avnivo.com
                </a>
                <span className="text-gray-500 block">Typical response within 48 business hours</span>
              </div>

              <div>
                <span className="font-bold text-gray-400 block uppercase">Official Telephone:</span>
                <span className="font-medium text-charcoal">[+91 80 1234 5678 Placeholder]</span>
                <span className="text-gray-500 block">Mon - Fri, 10:00 AM - 6:00 PM IST</span>
              </div>

              <div>
                <span className="font-bold text-gray-400 block uppercase">Office Address:</span>
                <span className="font-medium text-charcoal">
                  [AVNIVO India Grievance Cell, Level 4, Tech Enclave, Outer Ring Road, Bengaluru, Karnataka - 560103 Placeholder]
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary font-display">
            Grievance Resolution Timelines
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
            <li><strong>Acknowledgment:</strong> All complaints received via email or our grievance portal are assigned a tracking ticket and acknowledged within <strong>48 hours</strong>.</li>
            <li><strong>Investigation & Redressal:</strong> Grievances are reviewed and redressed within <strong>30 days</strong> of receipt under statutory norms.</li>
          </ul>
        </section>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Need to report a bug or incorrect price immediately?</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-secondary text-white text-xs font-semibold px-4 py-2 rounded-xl"
          >
            <span>Submit Support Ticket</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
