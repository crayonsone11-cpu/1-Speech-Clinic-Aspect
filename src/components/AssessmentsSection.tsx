import React, { useState } from 'react';
import { CLINICAL_SERVICES, ClinicalService } from '../data/clinicData';
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Phone,
} from 'lucide-react';

interface AssessmentsSectionProps {
  onSelectServiceForBooking: (service: ClinicalService) => void;
}

export function AssessmentsSection({
  onSelectServiceForBooking,
}: AssessmentsSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('initial-consultation');

  const activeService =
    CLINICAL_SERVICES.find((s) => s.id === selectedServiceId) ||
    CLINICAL_SERVICES[0];

  const currentIndex = CLINICAL_SERVICES.findIndex((s) => s.id === activeService.id);

  const handlePrevService = () => {
    const prevIndex = (currentIndex - 1 + CLINICAL_SERVICES.length) % CLINICAL_SERVICES.length;
    setSelectedServiceId(CLINICAL_SERVICES[prevIndex].id);
  };

  const handleNextService = () => {
    const nextIndex = (currentIndex + 1) % CLINICAL_SERVICES.length;
    setSelectedServiceId(CLINICAL_SERVICES[nextIndex].id);
  };

  return (
    <section
      id="assessments"
      className="scroll-mt-20 py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto"
    >
      {/* Header - Concise & Balanced */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end mb-6 sm:mb-8">
        <div className="lg:col-span-7">
          <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wide mb-1">
            Clinical Services & Evaluations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight font-normal text-[#0B3866] text-balance">
            Therapy Sessions & Diagnostic Assessments
          </h2>
        </div>
        <div className="lg:col-span-5 text-[#0B3866]/80 text-xs sm:text-sm leading-relaxed">
          <p>
            From relaxed play-based consultations and weekly therapy (from €115) to formal
            standardized diagnostic reports for schools, each pathway is tailored to your child.
          </p>
        </div>
      </div>

      {/* TWO-PANEL SPLIT VIEW (Toolbar removed for maximum clarity and vertical fit) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* LEFT PANEL: Clinical Directory */}
        <div className="lg:col-span-5 bg-[#F4EFEA] rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 border border-[#0B3866]/10 flex flex-col shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-[#0B3866]/10">
            <span className="text-xs font-semibold text-[#11558E] uppercase tracking-wide">
              Select Clinical Pathway
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0B3866]/10 font-semibold text-[#0B3866] tabular-nums">
              8 Options
            </span>
          </div>

          {/* Service List */}
          <div
            role="tablist"
            aria-label="Clinical pathways"
            className="space-y-2 max-h-[500px] overflow-y-auto pr-1 sm:pr-1.5 focus:outline-none"
          >
            {CLINICAL_SERVICES.map((service, idx) => {
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-[#11558E] ${
                    isSelected
                      ? 'bg-[#0B3866] text-white shadow-sm ring-2 ring-[#0B3866]/20'
                      : 'bg-[#FBF9F5] hover:bg-[#C4E0F9]/40 text-[#0B3866] border border-[#0B3866]/10'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] mb-1">
                      <span
                        className={`font-semibold tabular-nums ${
                          isSelected ? 'text-[#C4E0F9]' : 'text-[#11558E]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}.{' '}
                        {service.category === 'consultation-therapy' ? 'Therapy' : 'Diagnostic'}
                      </span>
                      <span className={isSelected ? 'text-white/40' : 'text-[#0B3866]/30'}>·</span>
                      <span
                        className={`truncate text-[11px] ${
                          isSelected ? 'text-white/80' : 'text-[#0B3866]/70'
                        }`}
                      >
                        {service.duration}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-base sm:text-lg leading-snug font-medium truncate ${
                        isSelected ? 'text-white' : 'text-[#0B3866]'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span
                        className={`font-semibold tabular-nums ${
                          isSelected ? 'text-[#C4E0F9]' : 'text-[#0B3866]'
                        }`}
                      >
                        From €{service.startingFee}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                        isSelected
                          ? 'bg-white/20 text-white translate-x-0.5'
                          : 'bg-[#0B3866]/5 text-[#0B3866]'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Full Clinical Information */}
        <div className="lg:col-span-7 bg-[#F4EFEA] rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 lg:p-8 border border-[#0B3866]/10 shadow-xs flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Top Stepper Bar */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#0B3866]/10">
              <span className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-[#C4E0F9]/80 text-[#0B3866]">
                {activeService.category === 'diagnostic-assessment'
                  ? 'Standardized Diagnostic Assessment · Formal Report Included'
                  : 'Clinical Consultation & Therapy Pathway'}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-[#0B3866]">
                <button
                  type="button"
                  onClick={handlePrevService}
                  aria-label="Previous service"
                  className="p-1.5 rounded-full hover:bg-white text-[#0B3866] transition-colors cursor-pointer border border-[#0B3866]/10 focus-visible:outline-2 focus-visible:outline-[#11558E]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-semibold px-1 tabular-nums">
                  {currentIndex + 1} of {CLINICAL_SERVICES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextService}
                  aria-label="Next service"
                  className="p-1.5 rounded-full hover:bg-white text-[#0B3866] transition-colors cursor-pointer border border-[#0B3866]/10 focus-visible:outline-2 focus-visible:outline-[#11558E]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Timing */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[30px] leading-tight text-[#0B3866] font-normal mb-2">
              {activeService.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#0B3866]/85 mb-3.5">
              <span className="inline-flex items-center gap-1.5 bg-[#FBF9F5] px-3 py-1 rounded-full border border-[#0B3866]/10 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#11558E]" />
                <span>{activeService.duration}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FBF9F5] px-3 py-1 rounded-full border border-[#0B3866]/10">
                <MapPin className="w-3.5 h-3.5 text-[#11558E]" />
                <span>{activeService.deliveryModalities.join(' · ')}</span>
              </span>
            </div>

            {/* Concise Clinical Summary */}
            <p className="text-xs sm:text-sm text-[#0B3866]/85 leading-relaxed mb-4">
              {activeService.clinicalDescription || activeService.shortSummary}
            </p>

            {/* Two Side-by-Side Cards: Ideal For & What Is Included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Ideal For */}
              <div className="bg-[#FBF9F5] rounded-2xl p-3.5 border border-[#0B3866]/10">
                <p className="text-xs font-bold text-[#0B3866] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#11558E]" />
                  <span>Ideal for your child if:</span>
                </p>
                <ul className="space-y-1.5 text-xs text-[#0B3866]/85">
                  {activeService.idealFor.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#11558E] font-bold leading-none mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Included */}
              <div className="bg-[#FBF9F5] rounded-2xl p-3.5 border border-[#0B3866]/10">
                <p className="text-xs font-bold text-[#0B3866] mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#11558E]" />
                  <span>What is included:</span>
                </p>
                <ul className="space-y-1.5 text-xs text-[#0B3866]/85">
                  {activeService.deliverables.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#11558E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-3 border-t border-[#0B3866]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/70 rounded-2xl p-3.5">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-[#0B3866]/70">Fee:</span>
                <span className="font-display text-2xl sm:text-3xl font-semibold text-[#0B3866] tabular-nums">
                  From €{activeService.startingFee}
                </span>
              </div>
              <p className="text-[11px] text-[#0B3866]/65 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-[#11558E] shrink-0" />
                <span>Reimbursable under VHI / Laya / Irish Life + Med 1 relief</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+353851531931"
                className="min-h-[44px] px-3.5 py-2 rounded-full border border-[#0B3866]/20 hover:bg-[#0B3866] hover:text-white text-[#0B3866] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Call Clinic"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call Clinic</span>
              </a>
              <button
                type="button"
                onClick={() => onSelectServiceForBooking(activeService)}
                className="min-h-[44px] flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-full bg-[#11558E] hover:bg-[#0B3866] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#11558E]"
              >
                <span>Book Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}