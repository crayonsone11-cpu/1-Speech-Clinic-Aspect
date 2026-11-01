import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/clinicData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto"
    >
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm font-semibold text-[#11558E] uppercase tracking-wide mb-2 flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#11558E]" />
          <span>Helpful Answers</span>
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight font-normal text-[#0B3866] mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#0B3866]/80 max-w-xl mx-auto leading-relaxed">
          Find clear answers about appointment fees, health insurance reimbursement, referrals,
          and how our clinical sessions work.
        </p>
      </div>

      {/* Simple, Elegant FAQ Accordion List */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openFaqId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#F4EFEA] rounded-2xl overflow-hidden border border-[#0B3866]/10 transition-all duration-150"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => toggleFaq(item.id)}
                className="w-full min-h-[52px] px-5 sm:px-7 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#C4E0F9]/30 transition-colors focus-visible:outline-2 focus-visible:outline-[#11558E]"
              >
                <span className="font-display text-lg sm:text-[21px] text-[#0B3866] font-medium leading-snug">
                  {item.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#FBF9F5] border border-[#0B3866]/10 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#11558E] text-white border-transparent' : 'text-[#11558E]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-5 sm:px-7 pb-5 pt-1 text-sm sm:text-[15px] text-[#0B3866]/85 leading-relaxed border-t border-[#0B3866]/8"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Export as FeesAndFaqSection as well for drop-in compatibility
export { FaqSection as FeesAndFaqSection };