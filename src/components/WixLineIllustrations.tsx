import React, { useState } from 'react';
import { ClinicalIndication } from '../data/clinicData';

export function AspectLogoMark({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Speech Bubble Outer */}
      <path
        d="M12 30C12 17.5 20 11 32 11C44 11 52 17.5 52 30C52 40.5 45.5 47.5 35.5 48.8L41 56L28.5 49C18.2 48.5 12 41.5 12 30Z"
        fill="#FEF08A"
        stroke="#0B3866"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Inner Child Face Circle */}
      <circle
        cx="32"
        cy="30"
        r="13.5"
        fill="#FBF9F5"
        stroke="#0B3866"
        strokeWidth="2.2"
      />
      {/* Left Ear */}
      <path
        d="M18.5 28.5C16.5 28.5 15.5 30 15.5 31.5C15.5 33 16.8 34.2 18.8 34"
        fill="#FBF9F5"
        stroke="#0B3866"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Hair curls */}
      <path
        d="M26 19.5C26 22.5 23.5 24.5 21.5 25"
        stroke="#0B3866"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 17.5C32 21 29 23.5 26.5 24.5"
        stroke="#0B3866"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M37.5 18.5C37.5 21.5 35 23.8 32.5 24.5"
        stroke="#0B3866"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <circle cx="27.5" cy="30" r="1.8" fill="#0B3866" />
      <circle cx="36.5" cy="30" r="1.8" fill="#0B3866" />
      {/* Cute Nose */}
      <circle cx="32" cy="32.2" r="1.3" fill="#38BDF8" />
      {/* Warm Smile */}
      <path
        d="M28 35.5C29.5 37.3 34.5 37.3 36 35.5"
        stroke="#0B3866"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IndicationLineIllustration({
  type,
}: {
  type: ClinicalIndication['illustrationType'];
}) {
  switch (type) {
    case 'late-talker':
      return (
        <svg viewBox="0 0 140 130" fill="none" className="w-32 h-28 mx-auto" aria-hidden="true">
          {/* Tiny stars & dots in Wix wh-1106 style */}
          <path d="M26 30L28 25L30 30L35 32L30 34L28 39L26 34L21 32L26 30Z" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.5" />
          <path d="M110 26L111.5 22L113 26L117 27.5L113 29L111.5 33L110 29L106 27.5L110 26Z" fill="#BAE6FD" stroke="#0B3866" strokeWidth="1.5" />
          <circle cx="24" cy="88" r="2" fill="#0B3866" />
          <circle cx="114" cy="84" r="2" fill="#0B3866" />
          <circle cx="70" cy="18" r="2.2" fill="#0B3866" />

          {/* Tilted Play Block C */}
          <g transform="rotate(-14 68 48)">
            <rect x="52" y="32" width="32" height="32" rx="4" fill="#FEF08A" stroke="#0B3866" strokeWidth="2.2" />
            <text x="68" y="54" textAnchor="middle" fill="#0B3866" fontSize="16" fontWeight="700" fontFamily="Plus Jakarta Sans">
              C
            </text>
          </g>
          {/* Bottom Play Blocks A & B */}
          <rect x="36" y="64" width="32" height="32" rx="4" fill="#FBF9F5" stroke="#0B3866" strokeWidth="2.2" />
          <text x="52" y="86" textAnchor="middle" fill="#0B3866" fontSize="16" fontWeight="700" fontFamily="Plus Jakarta Sans">
            A
          </text>
          <rect x="72" y="64" width="32" height="32" rx="4" fill="#C4E0F9" stroke="#0B3866" strokeWidth="2.2" />
          <text x="88" y="86" textAnchor="middle" fill="#0B3866" fontSize="16" fontWeight="700" fontFamily="Plus Jakarta Sans">
            B
          </text>
        </svg>
      );

    case 'speech-clarity':
      return (
        <svg viewBox="0 0 140 130" fill="none" className="w-32 h-28 mx-auto" aria-hidden="true">
          <circle cx="26" cy="40" r="2" fill="#0B3866" />
          <circle cx="114" cy="46" r="2" fill="#0B3866" />
          <path d="M30 82L32 77L34 82L39 84L34 86L32 91L30 86L25 84L30 82Z" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.5" />
          <path d="M108 78L110 73L112 78L117 80L112 82L110 87L108 82L103 80L108 78Z" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.5" />

          {/* Main Speech Bubble */}
          <path
            d="M36 56C36 39 50 28 70 28C90 28 104 39 104 56C104 71 92 82 75 83.5L63 96L64 83.5C47 81.5 36 70.5 36 56Z"
            fill="#FBF9F5"
            stroke="#0B3866"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Sound Clarity Waves inside */}
          <rect x="53" y="51" width="5" height="12" rx="2.5" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="63" y="43" width="5" height="28" rx="2.5" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="73" y="47" width="5" height="20" rx="2.5" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="83" y="52" width="5" height="10" rx="2.5" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.8" />
        </svg>
      );

    case 'language-growth':
      return (
        <svg viewBox="0 0 140 130" fill="none" className="w-32 h-28 mx-auto" aria-hidden="true">
          <circle cx="28" cy="34" r="2" fill="#0B3866" />
          <circle cx="112" cy="36" r="2" fill="#0B3866" />
          <path d="M70 18L72 12L74 18L80 20L74 22L72 28L70 22L64 20L70 18Z" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.5" />

          {/* Open Storybook */}
          <path
            d="M70 44C58 39 44 39 34 43V88C44 84 58 84 70 89C82 84 96 84 106 88V43C96 39 82 39 70 44Z"
            fill="#FBF9F5"
            stroke="#0B3866"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M70 44V89" stroke="#0B3866" strokeWidth="2.2" />
          {/* Left Page highlight */}
          <rect x="42" y="52" width="18" height="12" rx="2" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.6" />
          <line x1="42" y1="71" x2="60" y2="71" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="77" x2="55" y2="77" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          {/* Right Page highlight */}
          <circle cx="88" cy="58" r="7" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.6" />
          <line x1="80" y1="72" x2="97" y2="72" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="78" x2="93" y2="78" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'social-aac':
      return (
        <svg viewBox="0 0 140 130" fill="none" className="w-32 h-28 mx-auto" aria-hidden="true">
          <path d="M24 44L26 39L28 44L33 46L28 48L26 53L24 48L19 46L24 44Z" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.5" />
          <path d="M114 38L116 33L118 38L123 40L118 42L116 47L114 42L109 40L114 38Z" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.5" />
          <circle cx="30" cy="86" r="2" fill="#0B3866" />
          <circle cx="112" cy="86" r="2" fill="#0B3866" />

          {/* AAC Communication Board / Tablet */}
          <rect x="38" y="30" width="64" height="66" rx="10" fill="#FBF9F5" stroke="#0B3866" strokeWidth="2.2" />
          {/* 4 AAC Symbol Cells */}
          <rect x="46" y="39" width="21" height="20" rx="4" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="73" y="39" width="21" height="20" rx="4" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="46" y="65" width="21" height="20" rx="4" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.8" />
          <rect x="73" y="65" width="21" height="20" rx="4" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.8" />
          {/* Mini symbols inside cells */}
          <circle cx="56.5" cy="49" r="4" fill="#0B3866" />
          <path d="M80 49L83.5 45L87 49L83.5 53Z" fill="#0B3866" />
          <path d="M52 75H61M56.5 70.5V79.5" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          <path d="M79 74C80.5 76.5 86.5 76.5 88 74" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'feeding-oral':
      return (
        <svg viewBox="0 0 140 130" fill="none" className="w-32 h-28 mx-auto" aria-hidden="true">
          <circle cx="28" cy="42" r="2" fill="#0B3866" />
          <circle cx="110" cy="36" r="2" fill="#0B3866" />
          <path d="M32 76L34 71L36 76L41 78L36 80L34 85L32 80L27 78L32 76Z" fill="#FEF08A" stroke="#0B3866" strokeWidth="1.5" />
          <path d="M108 76L110 71L112 76L117 78L112 80L110 85L108 80L103 78L108 76Z" fill="#C4E0F9" stroke="#0B3866" strokeWidth="1.5" />

          {/* Child Cup & Bowl with Warm Heart */}
          <path
            d="M44 58H96C96 76 84 88 70 88C56 88 44 76 44 58Z"
            fill="#C4E0F9"
            stroke="#0B3866"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <rect x="40" y="52" width="60" height="7" rx="3.5" fill="#FEF08A" stroke="#0B3866" strokeWidth="2" />
          {/* Gentle Steam / Smooth Fluency Curves */}
          <path d="M58 44C58 38 63 36 63 30" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 42C70 36 75 34 75 28" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 44C82 38 87 36 87 30" stroke="#0B3866" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EFEA] via-[#E8F2FC] to-[#C4E0F9] text-[#0B3866] p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <AspectLogoMark className="w-16 h-16 mb-3" />
        <p className="font-display text-xl font-medium text-[#0B3866]">
          {fallbackLabel || 'Aspect Speech Therapy Dublin'}
        </p>
        <p className="text-xs text-[#0B3866]/75 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}