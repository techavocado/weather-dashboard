import React from "react";

export const TemperatureIcon = ({ temp }) => {
  if (temp === undefined || temp === null) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <path d="M12 12v4" />
      </svg>
    );
  }

  if (temp <= 10) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
        <defs>
          <radialGradient id="ti-cold-core" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>
          <linearGradient id="ti-cold-ray" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="ti-cold-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#7dd3fc" floodOpacity="0.8" />
          </filter>
        </defs>
        <g filter="url(#ti-cold-glow)">
          {/* Horizontal arm */}
          <rect x="8" y="23.5" width="36" height="5" rx="2.5" fill="url(#ti-cold-ray)" />
          {/* Vertical arm */}
          <rect x="23.5" y="8" width="5" height="36" rx="2.5" fill="url(#ti-cold-ray)" />
          {/* Diagonal arms */}
          <rect x="23.5" y="8" width="5" height="36" rx="2.5" fill="url(#ti-cold-ray)" transform="rotate(45 26 26)" />
          <rect x="23.5" y="8" width="5" height="36" rx="2.5" fill="url(#ti-cold-ray)" transform="rotate(-45 26 26)" />
          {/* Center gem */}
          <circle cx="26" cy="26" r="5.5" fill="url(#ti-cold-core)" />
          {/* Arm tips (diamonds) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="26"
              cy="9"
              rx="3"
              ry="3"
              fill="#bae6fd"
              transform={`rotate(${angle} 26 26)`}
            />
          ))}
        </g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 26 26"
          to="360 26 26"
          dur="8s"
          repeatCount="indefinite"
        />
      </svg>
    );
  }

  if (temp > 10 && temp <= 22) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
        <defs>
          <radialGradient id="ti-mild-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="60%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          <radialGradient id="ti-mild-cloud-face" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </radialGradient>
          <filter id="ti-mild-shadow">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#60a5fa" floodOpacity="0.4" />
          </filter>
          <filter id="ti-mild-sun-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fde047" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Sun behind cloud */}
        <g filter="url(#ti-mild-sun-glow)">
          <circle cx="18" cy="20" r="10" fill="url(#ti-mild-sun)">
            <animate attributeName="r" values="9;10.5;9" dur="2.5s" repeatCount="indefinite" />
          </circle>
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="18" y1="7"
              x2="18" y2="4"
              stroke="#fde047"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle} 18 20)`}
            />
          ))}
        </g>

        {/* Cloud body */}
        <g filter="url(#ti-mild-shadow)">
          <ellipse cx="30" cy="33" rx="14" ry="9" fill="url(#ti-mild-cloud-face)" />
          <circle cx="22" cy="31" r="8" fill="url(#ti-mild-cloud-face)" />
          <circle cx="33" cy="29" r="9" fill="url(#ti-mild-cloud-face)" />
          <circle cx="27" cy="27" r="7.5" fill="url(#ti-mild-cloud-face)" />
          <ellipse cx="28" cy="38" rx="12" ry="5" fill="url(#ti-mild-cloud-face)" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 2,-1; 0,0; -1,1; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    );
  }

  if (temp > 22 && temp <= 32) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
        <defs>
          <radialGradient id="ti-hot-core" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="40%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>
          <radialGradient id="ti-hot-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="ti-hot-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fb923c" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Outer halo pulse */}
        <circle cx="26" cy="26" r="20" fill="url(#ti-hot-halo)">
          <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Rotating group: rays + sun */}
        <g filter="url(#ti-hot-glow)">
          {/* Rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 26 26)`}>
              <rect x="24" y="5" width="4" height="8" rx="2" fill="#fb923c" />
            </g>
          ))}
          {/* Sun core */}
          <circle cx="26" cy="26" r="11" fill="url(#ti-hot-core)" />
          {/* Specular highlight */}
          <ellipse cx="22" cy="22" rx="4" ry="3" fill="white" opacity="0.35" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 26 26"
            to="360 26 26"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    );
  }

  // Very Hot > 32°C — orange-yellow sun
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
      <defs>
        <radialGradient id="ti-vhot-core" cx="38%" cy="33%" r="62%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="ti-vhot-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ti-vhot-wave" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0" />
          <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
        <filter id="ti-vhot-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f97316" floodOpacity="1" />
        </filter>
      </defs>

      {/* Double halo pulsing rings */}
      <circle cx="26" cy="26" r="23" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="26" cy="26" r="19" fill="url(#ti-vhot-halo)">
        <animate attributeName="r" values="16;22;16" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Rotating jagged spikes */}
      <g filter="url(#ti-vhot-glow)">
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 26 26)`}>
            <polygon
              points="26,4 27.5,10 24.5,10"
              fill={i % 2 === 0 ? "#f97316" : "#fcd34d"}
              opacity={i % 2 === 0 ? 1 : 0.7}
            />
          </g>
        ))}
        {/* Core sun */}
        <circle cx="26" cy="26" r="10" fill="url(#ti-vhot-core)">
          <animate attributeName="r" values="9;11;9" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Inner highlight */}
        <ellipse cx="23" cy="23" rx="3.5" ry="2.5" fill="white" opacity="0.42" />

        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 26 26"
          to="360 26 26"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>

      {/* Heatwave shimmer lines rising */}
      {[14, 22, 30, 38].map((x, i) => (
        <line
          key={i}
          x1={x} y1="46"
          x2={x} y2="36"
          stroke="url(#ti-vhot-wave)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        >
          <animate attributeName="y1" values="48;38;48" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="y2" values="38;28;38" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.8;0" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
};


export default function ForecastCard({ day, temp, onOpenOverlay, date }) {

  const getIcon = (t) => {
    if (t === undefined || t === null) return null;

    // ─── COLD (≤ 10°C) ── 3D Spinning Snowflake — spin is on inner <g>, NOT the <svg> ──
    if (t <= 10) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <radialGradient id="fc-cold-core" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
            <linearGradient id="fc-cold-arm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="fc-cold-glow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.9" />
            </filter>
          </defs>
          {/* Spin the inner <g>, never the root <svg> */}
          <g filter="url(#fc-cold-glow)">
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 26 26" to="360 26 26" dur="9s" repeatCount="indefinite" />
              {/* 6 arms at 60° steps, each full span top-to-bottom */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <g key={i} transform={`rotate(${angle} 26 26)`}>
                  <rect x="24.5" y="6" width="3" height="40" rx="1.5" fill="url(#fc-cold-arm)" />
                  {/* branch ticks near tip */}
                  <rect x="24.5" y="11" width="3" height="5.5" rx="1.5" fill="#bae6fd" transform="rotate(55 26 14)" />
                  <rect x="24.5" y="11" width="3" height="5.5" rx="1.5" fill="#bae6fd" transform="rotate(-55 26 14)" />
                </g>
              ))}
              {/* 3D gem center */}
              <circle cx="26" cy="26" r="6" fill="url(#fc-cold-core)" />
              <ellipse cx="24.2" cy="24.2" rx="2.3" ry="1.6" fill="white" opacity="0.45" />
            </g>
          </g>
        </svg>
      );
    }

    // ─── MILD (11–22°C) ── Floating Cloud with Sun ───────────────────────────
    if (t > 10 && t <= 22) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <radialGradient id="fc-mild-sun" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="55%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
            <radialGradient id="fc-mild-cloud" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#93c5fd" />
            </radialGradient>
            <filter id="fc-mild-cloudshadow">
              <feDropShadow dx="1" dy="2.5" stdDeviation="2.5" floodColor="#3b82f6" floodOpacity="0.35" />
            </filter>
            <filter id="fc-mild-sunglow">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#fde047" floodOpacity="0.75" />
            </filter>
          </defs>
          <g filter="url(#fc-mild-sunglow)">
            <circle cx="19" cy="20" r="9" fill="url(#fc-mild-sun)">
              <animate attributeName="r" values="8.5;10;8.5" dur="3s" repeatCount="indefinite" />
            </circle>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={i} x1="19" y1="8.5" x2="19" y2="5.5" stroke="#fde047" strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${angle} 19 20)`} />
            ))}
          </g>
          <g filter="url(#fc-mild-cloudshadow)">
            <ellipse cx="31" cy="35" rx="14" ry="9" fill="url(#fc-mild-cloud)" />
            <circle cx="22" cy="32" r="8" fill="url(#fc-mild-cloud)" />
            <circle cx="33" cy="29" r="9.5" fill="url(#fc-mild-cloud)" />
            <circle cx="27" cy="27" r="8" fill="url(#fc-mild-cloud)" />
            <ellipse cx="31" cy="39" rx="12" ry="5" fill="url(#fc-mild-cloud)" />
            <ellipse cx="24" cy="26" rx="5" ry="3" fill="white" opacity="0.5" />
            <animateTransform attributeName="transform" type="translate" values="0,0; 2.5,-1.5; 0,0; -1.5,1.5; 0,0" dur="4.5s" repeatCount="indefinite" />
          </g>
        </svg>
      );
    }

    // ─── HOT (23–32°C) ── 3D Animated Flame ─────────────────────────────────
    if (t > 22 && t <= 32) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <radialGradient id="fc-hot-inner" cx="50%" cy="80%" r="65%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="30%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <radialGradient id="fc-hot-outer" cx="50%" cy="85%" r="60%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="55%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <radialGradient id="fc-hot-core2" cx="50%" cy="75%" r="55%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fbbf24" />
            </radialGradient>
            <filter id="fc-hot-glow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#f97316" floodOpacity="0.9" />
            </filter>
          </defs>
          <g filter="url(#fc-hot-glow)">
            {/* Outer flame body */}
            <path d="M26 48 C14 44 10 36 13 26 C15 18 20 15 22 10 C23 7 24 4 26 2 C26 2 26 8 28 10 C30 13 32 11 33 8 C35 14 36 20 34 26 C33 30 31 32 32 36 C33 39 35 41 34 44 C31 47 28 48 26 48 Z">
              <animate attributeName="d"
                values="M26 48 C14 44 10 36 13 26 C15 18 20 15 22 10 C23 7 24 4 26 2 C26 2 26 8 28 10 C30 13 32 11 33 8 C35 14 36 20 34 26 C33 30 31 32 32 36 C33 39 35 41 34 44 C31 47 28 48 26 48 Z;
                       M26 48 C13 43 9 34 12 24 C14 16 19 13 21 8 C22 5 23 3 26 2 C26 2 27 9 29 11 C31 14 34 12 34 9 C36 15 37 22 35 28 C34 32 32 34 33 37 C34 40 36 42 35 45 C32 48 28 48 26 48 Z;
                       M26 48 C14 44 10 36 13 26 C15 18 20 15 22 10 C23 7 24 4 26 2 C26 2 26 8 28 10 C30 13 32 11 33 8 C35 14 36 20 34 26 C33 30 31 32 32 36 C33 39 35 41 34 44 C31 47 28 48 26 48 Z"
                dur="1.4s" repeatCount="indefinite" />
            </path>
            {/* Mid flame */}
            <path fill="url(#fc-hot-inner)" d="M26 46 C18 42 16 34 18 26 C20 20 23 18 24 13 C25 10 25 7 26 5 C27 9 28 12 30 14 C31 16 33 14 33 11 C35 17 34 24 32 30 C31 34 30 36 31 39 C32 41 33 43 32 45 C30 47 27 47 26 46 Z">
              <animate attributeName="d"
                values="M26 46 C18 42 16 34 18 26 C20 20 23 18 24 13 C25 10 25 7 26 5 C27 9 28 12 30 14 C31 16 33 14 33 11 C35 17 34 24 32 30 C31 34 30 36 31 39 C32 41 33 43 32 45 C30 47 27 47 26 46 Z;
                       M26 46 C17 41 15 33 17 25 C19 19 22 16 23 11 C24 8 24 6 26 5 C27 10 29 13 31 15 C32 17 34 15 34 12 C36 18 35 25 33 31 C32 35 31 37 32 40 C33 42 34 44 33 46 C31 48 27 47 26 46 Z;
                       M26 46 C18 42 16 34 18 26 C20 20 23 18 24 13 C25 10 25 7 26 5 C27 9 28 12 30 14 C31 16 33 14 33 11 C35 17 34 24 32 30 C31 34 30 36 31 39 C32 41 33 43 32 45 C30 47 27 47 26 46 Z"
                dur="1.4s" repeatCount="indefinite" />
            </path>
            {/* Hot white-yellow inner core */}
            <path fill="url(#fc-hot-core2)" d="M26 44 C21 41 20 35 22 29 C23 24 25 22 26 18 C27 22 28 24 29 28 C30 32 29 36 28 39 C28 41 28 43 26 44 Z">
              <animate attributeName="d"
                values="M26 44 C21 41 20 35 22 29 C23 24 25 22 26 18 C27 22 28 24 29 28 C30 32 29 36 28 39 C28 41 28 43 26 44 Z;
                       M26 44 C20 40 19 34 21 28 C22 23 24 21 26 17 C28 21 29 25 30 29 C31 33 30 37 29 40 C29 42 28 43 26 44 Z;
                       M26 44 C21 41 20 35 22 29 C23 24 25 22 26 18 C27 22 28 24 29 28 C30 32 29 36 28 39 C28 41 28 43 26 44 Z"
                dur="1.4s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      );
    }

    // ─── VERY HOT (> 32°C) ── Plain bright yellow rotating sun (no cloud, no spikes) ──
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
        <defs>
          <radialGradient id="fc-vhot-core" cx="38%" cy="33%" r="62%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <radialGradient id="fc-vhot-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </radialGradient>
          <filter id="fc-vhot-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#fde047" floodOpacity="0.95" />
          </filter>
        </defs>
        {/* Soft pulsing ambient halo */}
        <circle cx="26" cy="26" r="20" fill="url(#fc-vhot-halo)">
          <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Rotating group: 8 rays + 3D core */}
        <g filter="url(#fc-vhot-glow)">
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 26 26" to="360 26 26" dur="6s" repeatCount="indefinite" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(0 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(45 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(90 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(135 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(180 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(225 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(270 26 26)" />
            <rect x="24" y="4.5" width="4" height="9" rx="2" fill="#fde047" transform="rotate(315 26 26)" />
            {/* 3D core with specular dome */}
            <circle cx="26" cy="26" r="12" fill="url(#fc-vhot-core)">
              <animate attributeName="r" values="11;13;11" dur="2s" repeatCount="indefinite" />
            </circle>
            <ellipse cx="21.5" cy="21.5" rx="5" ry="3.5" fill="white" opacity="0.38" />
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div
      className="forecast-card"
      style={{
        background: "#1e1e1e",
        padding: "15px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderRadius: "12px",
        color: "white",
        textAlign: "center",
        width: "94px",
        cursor: "pointer"
      }}
      onClick={() =>
        onOpenOverlay("forecast", {
          day,
          temp,
          date
        })
      }
    >
      <p style={{ fontSize: "18px", opacity: 0.6 }}>{day}</p>
      <div style={{ margin: "10px 0" }}>
        {getIcon(temp)}
      </div>
      <h3>{temp}°C</h3>
    </div>
  );
}