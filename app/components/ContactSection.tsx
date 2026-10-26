'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, MapPin, Send } from 'lucide-react';

const interestOptions = [
  'Advisory and Assessments',
  'Data Centre and On Premises',
  'Public Cloud',
  'Cloud and DevOps',
  'Container Platforms',
  'Red Hat OpenShift',
  'VMware Off Ramp & Migration',
  'Application Modernisation',
  'DevSecOps and Security',
  'Managed Services',
  'AI and Data Infrastructure',
  'Other Technology Requirements',
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    company: '',
    jobTitle: '',
    country: '',
    interest: interestOptions[0],
    summary: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <section className="pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-18 lg:pb-28 bg-[#F4EFE6]" id="contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Description & Contact info */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1E5A63] mb-4">
              Direct Engagement
            </p>
            <h2 className="text-[clamp(2.6rem,4.8vw,4.4rem)] font-extrabold text-[#171614] tracking-[-0.04em] leading-[0.96] mb-6">
              READY TO MODERNIZE YOUR DIGITAL CORE?
            </h2>
            <p className="text-[1.1rem] leading-relaxed text-[#171614]/70 mb-10 max-w-[460px]">
              Talk to our team about your infrastructure, cloud, application or operations requirements. We will review your landscape and outline practical next steps.
            </p>

            <div className="space-y-4 pt-6 border-t border-[#171614]/10">
              <div className="flex items-center gap-3 text-sm text-[#171614]/80">
                <div className="w-8 h-8 rounded-full bg-[#171614]/[0.05] flex items-center justify-center text-[#B84A2B]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#171614]/40 uppercase block">Enquiries</span>
                  <a href="mailto:hello@nuberu.tech" className="font-medium hover:text-[#B84A2B] transition-colors">
                    hello@nuberu.tech
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#171614]/80">
                <div className="w-8 h-8 rounded-full bg-[#171614]/[0.05] flex items-center justify-center text-[#B84A2B]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#171614]/40 uppercase block">Headquarters</span>
                  <span className="font-medium">London, United Kingdom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Enterprise Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#171614]/10 shadow-[0_20px_50px_-20px_rgba(23,22,20,0.06)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1E5A63]/10 text-[#1E5A63] flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#171614] mb-3">
                    Enquiry Received
                  </h3>
                  <p className="text-[15px] text-[#171614]/70 max-w-[420px] mx-auto leading-relaxed mb-6">
                    Thank you. A senior platform architect will review your project summary and contact you at {formData.businessEmail || 'your email'}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#B84A2B] hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="e.g. VP of Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Country or Region *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom"
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                        Area of Interest *
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all"
                      >
                        {interestOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171614]/70 mb-2">
                      Project Summary & Constraints *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Outline current platforms, objectives, timelines and known operational risks..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/50 border border-[#171614]/15 text-sm text-[#171614] focus:outline-none focus:border-[#B84A2B] focus:bg-white transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-full text-[14.5px] font-semibold uppercase tracking-wider text-[#F4EFE6] bg-[#B84A2B] hover:bg-[#9E3E23] transition-all hover:shadow-[0_6px_20px_rgba(184,74,43,0.3)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>START A CONVERSATION</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-[#171614]/50 text-center leading-relaxed">
                    By submitting this form, you acknowledge that Nuberu will process your information strictly for responding to your enterprise enquiry. No marketing spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
