import React from "react";

export type IconProps = {
  size?: number;
  className?: string;
};

export const NextjsIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className}>
    <circle cx="90" cy="90" r="90" fill="black" />
    <path
      d="M149.508 157.438L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.134 149.508 157.438Z"
      fill="white"
    />
    <rect x="115" y="54" width="12" height="40" fill="white" />
  </svg>
);

export const PythonIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none" className={className}>
    <path
      d="M54.04 4.54C28.2 4.54 29.6 15.7 29.6 15.7l.03 11.56h24.8v3.52H20.08S4.5 28.98 4.5 54.73c0 25.75 13.56 24.8 13.56 24.8h8.1v-11.4s-.45-13.56 13.3-13.56h23.03s12.87.2 12.87-12.42V17.28s1.95-12.74-21.32-12.74zm-13.7 8.04c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z"
      fill="#387EB8"
    />
    <path
      d="M55.96 105.46c25.84 0 24.44-11.16 24.44-11.16l-.03-11.56H55.57v-3.52h34.35s15.58 1.8 15.58-23.95c0-25.75-13.56-24.8-13.56-24.8h-8.1v11.4s.45 13.56-13.3 13.56H47.51s-12.87-.2-12.87 12.42v24.87s-1.95 12.74 21.32 12.74zm13.7-8.04c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
      fill="#FFE052"
    />
  </svg>
);

export const TypescriptIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <rect width="128" height="128" rx="20" fill="#3178C6" />
    <path
      d="M60.7 73.8v7.2c-2.8 1.5-6.2 2.3-10.1 2.3-6.2 0-10.9-1.9-14.1-5.7-3.2-3.8-4.8-9.4-4.8-16.7 0-7.5 1.7-13.3 5.1-17.3 3.4-4 8.5-6 15.3-6 3.6 0 6.6.6 9 1.9v7.5c-2.4-1.3-5.2-2-8.3-2-4.5 0-7.8 1.4-9.8 4.2-2 2.8-3 7-3 12.7 0 5.4 1 9.4 3 12.1 2 2.7 5.2 4 9.6 4 3.1 0 5.8-.7 8.1-2.2zM75.3 43.5h27.4v6.8H89.9V83H81.7V50.3H68v-6.8h7.3z"
      fill="white"
    />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const FastapiIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <circle cx="64" cy="64" r="64" fill="#059669" />
    <path
      d="M68.5 24L38 68h24.5L58 104l32-44H65.5L68.5 24z"
      fill="white"
    />
  </svg>
);

export const FlaskIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <rect width="128" height="128" rx="20" fill="#18212C" />
    <path
      d="M58 24h12v18l18 36c3 6-1 14-8 14H48c-7 0-11-8-8-14l18-36V24z"
      stroke="#E2E8F0"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <line x1="52" y1="24" x2="76" y2="24" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
    <circle cx="56" cy="74" r="4" fill="#38BDF8" />
    <circle cx="70" cy="78" r="3" fill="#38BDF8" />
    <circle cx="62" cy="84" r="5" fill="#38BDF8" />
  </svg>
);

export const TailwindIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
      fill="#38BDF8"
    />
  </svg>
);

export const CppIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <path
      d="M64 14l43.3 25v50L64 114 20.7 89V39L64 14z"
      fill="#00599C"
    />
    <path
      d="M54 48c-8.8 0-16 7.2-16 16s7.2 16 16 16c5.3 0 10-2.6 13-6.5l-6-4.5c-1.8 2-4.3 3-7 3-5 0-9-4-9-9s4-9 9-9c2.7 0 5.2 1 7 3l6-4.5C64 50.6 59.3 48 54 48z"
      fill="white"
    />
    <path d="M74 61h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3zM89 61h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3z" fill="#004482" />
  </svg>
);

export const PytorchIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <path
      d="M74.4 20.5a6 6 0 0 1 8.5 0l24.6 24.6a45 45 0 1 1-63.6 0l11.4-11.4a29 29 0 1 0 41 0l-16-16a6 6 0 0 1 0-8.5l-5.9 11.3z"
      fill="#EE4C2C"
    />
    <circle cx="89" cy="30" r="7" fill="#EE4C2C" />
  </svg>
);

export const HuggingFaceIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <circle cx="64" cy="64" r="60" fill="#FFD21E" />
    {/* Eyes */}
    <ellipse cx="44" cy="54" rx="7" ry="8" fill="#18181B" />
    <ellipse cx="84" cy="54" rx="7" ry="8" fill="#18181B" />
    {/* Smile */}
    <path
      d="M44 74c6 10 34 10 40 0"
      stroke="#18181B"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Cheeks */}
    <circle cx="34" cy="68" r="6" fill="#F87171" opacity="0.8" />
    <circle cx="94" cy="68" r="6" fill="#F87171" opacity="0.8" />
  </svg>
);

export const RagIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="2" fill="#8B5CF6" />
    <rect x="14" y="3" width="7" height="7" rx="2" fill="#EC4899" />
    <rect x="8.5" y="14" width="7" height="7" rx="2" fill="#06B6D4" />
    <path d="M6.5 10v2a2 2 0 002 2h3.5M17.5 10v2a2 2 0 01-2 2H12" stroke="#CBD5E1" strokeWidth="1.5" />
  </svg>
);

export const ScikitLearnIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <circle cx="48" cy="64" r="32" fill="#3499CD" opacity="0.9" />
    <circle cx="80" cy="64" r="32" fill="#F89939" opacity="0.9" />
    <path d="M64 42a32 32 0 0 1 0 44 32 32 0 0 1 0-44z" fill="#2563EB" opacity="0.4" />
  </svg>
);

export const LangChainIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <rect width="128" height="128" rx="24" fill="#0E2F28" />
    <path
      d="M42 46a16 16 0 0 1 22.6 0l4 4a16 16 0 0 1 0 22.6l-8 8a16 16 0 0 1-22.6-22.6l4-4"
      stroke="#10B981"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M86 82a16 16 0 0 1-22.6 0l-4-4a16 16 0 0 1 0-22.6l8-8a16 16 0 0 1 22.6 22.6l-4 4"
      stroke="#34D399"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const MlopsIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="4" fill="#0284C7" />
    <path d="M7 14l3-4 4 4 3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="14" r="1.5" fill="white" />
    <circle cx="10" cy="10" r="1.5" fill="white" />
    <circle cx="14" cy="14" r="1.5" fill="white" />
    <circle cx="17" cy="11" r="1.5" fill="white" />
  </svg>
);

export const RedisIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <path
      d="M10 46l54-26 54 26-54 26L10 46z"
      fill="#DC382D"
    />
    <path
      d="M10 56l54 26v26L10 82V56z"
      fill="#A8231B"
    />
    <path
      d="M118 56l-54 26v26l54-26V56z"
      fill="#B82720"
    />
  </svg>
);

export const DockerIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <rect width="128" height="128" rx="20" fill="#082A4D" />
    {/* Containers */}
    <rect x="36" y="52" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="49" y="52" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="62" y="52" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="49" y="40" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="62" y="40" width="10" height="9" rx="1.5" fill="#2496ED" />
    <rect x="75" y="52" width="10" height="9" rx="1.5" fill="#2496ED" />
    {/* Whale Body */}
    <path
      d="M112 66c-2.4 0-7.8 1.2-11.4 4.5-4-5-10.4-8-17.6-8H24c-3 14 6 30 25 34 26 5 50 1 65-18 2.2-2.8 4-8.5-2-12.5z"
      fill="#2496ED"
    />
  </svg>
);

export const PostgresIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <circle cx="64" cy="64" r="60" fill="#336791" />
    <path
      d="M64 28c-17 0-26 12-26 26 0 17 9 27 15 36 3 5 4 10 4 15h14c0-5 1-10 4-15 6-9 15-19 15-36 0-14-9-26-26-26z"
      fill="white"
    />
    <ellipse cx="64" cy="50" rx="10" ry="12" fill="#336791" />
  </svg>
);

export const GithubActionsIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <circle cx="64" cy="64" r="64" fill="#2088FF" />
    <path
      d="M40 64a24 24 0 1 1 48 0 24 24 0 0 1-48 0zm24-12a12 12 0 1 0 0 24 12 12 0 0 0 0-24z"
      fill="white"
    />
    <path d="M64 28v12M64 88v12M28 64h12M88 64h12" stroke="white" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const JwtIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <path
      d="M64 12L24 28v36c0 28 17 54 40 60 23-6 40-32 40-60V28L64 12z"
      fill="#D63AFF"
    />
    <path
      d="M64 20L30 34v30c0 24 15 46 34 51 19-5 34-27 34-51V34L64 20z"
      fill="#0B0B0F"
    />
    <path
      d="M52 50h24v8H67v26h-8V58h-7v-8z"
      fill="#FB7185"
    />
  </svg>
);

export const AwsIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <rect width="128" height="128" rx="24" fill="#232F3E" />
    <text x="64" y="62" fill="white" fontSize="32" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
      aws
    </text>
    <path
      d="M34 82c20 14 42 14 60 0-2-2-5-4-5-4s-16 10-50 0c-2 2-5 4-5 4z"
      fill="#FF9900"
    />
  </svg>
);
