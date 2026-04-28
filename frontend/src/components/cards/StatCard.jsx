import React from 'react';
import "./StatCard.css"; 

const SunriseImage = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "6px", boxShadow: "0 0 0 1px rgba(255,255,255,0.2)" }}>
    <rect width="36" height="36" fill="url(#sunriseGrad)"/>
    <circle cx="18" cy="24" r="6" fill="#fde047" />
    <path d="M0 24H36V36H0V24Z" fill="url(#groundGrad)" />
    <defs>
      <linearGradient id="sunriseGrad" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60a5fa" />
        <stop offset="1" stopColor="#fca5a5" />
      </linearGradient>
      <linearGradient id="groundGrad" x1="18" y1="24" x2="18" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8b5cf6" opacity="0.6"/>
        <stop offset="1" stopColor="#1e1b4b" opacity="0.9"/>
      </linearGradient>
    </defs>
  </svg>
);

const SunsetImage = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "6px", boxShadow: "0 0 0 1px rgba(255,255,255,0.2)" }}>
    <rect width="36" height="36" fill="url(#sunsetGrad)"/>
    <circle cx="18" cy="24" r="6" fill="#facc15" />
    <path d="M0 24H36V36H0V24Z" fill="url(#cityGrad)" />
    <rect x="6" y="16" width="4" height="8" fill="#4c1d95" />
    <rect x="12" y="12" width="5" height="12" fill="#312e81" />
    <rect x="20" y="18" width="4" height="6" fill="#4c1d95" />
    <rect x="26" y="14" width="5" height="10" fill="#312e81" />
    <defs>
      <linearGradient id="sunsetGrad" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ea580c" />
        <stop offset="1" stopColor="#9f1239" />
      </linearGradient>
      <linearGradient id="cityGrad" x1="18" y1="24" x2="18" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4c1d95" opacity="0.8"/>
        <stop offset="1" stopColor="#0f172a" opacity="1"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function StatCard({ sunrise, sunset, sunriseOffset = "-1m 50s", sunsetOffset = "+ 2m 10s" }) {
  return (
    <div 
      className="card" 
      style={{ 
        height: "225px", 
        width: "310px", 
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      
      <div className="card-title" style={{ color: "#98989d", fontWeight: "500", marginTop: "4px",paddingTop:"10px" }}>
        Sunrise and sunset
      </div>

      {/* Graphical Arc Section */}
      <div style={{ position: "relative", flex: 1, minHeight: "55px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        
        {/* The Dotted Arc and Glowing Sun SVG */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 10 280 90" preserveAspectRatio="none">
          <path 
            d="M 20 80 Q 140 -20 260 80" 
            fill="none" 
            stroke="#4a4a4c" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
          />
          <circle cx="20" cy="80" r="4" fill="#facc15" filter="url(#glow)" />
          <path d="M 20 80 L 5 100 L 35 100 Z" fill="url(#beamGrad)" opacity="0.4" />
          
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#facc15" floodOpacity="0.8" />
            </filter>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels under the arc */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", padding: "0 10px", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#98989d", fontWeight: "500" }}>
             <SunriseImage size={14} /> {sunrise || "6:32 AM"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#98989d", fontWeight: "500" }}>
             <SunsetImage size={14} /> {sunset || "5:42 PM"}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "#333336", margin: "10px 0" }} />

      {/* Sunrise List Item */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SunriseImage size={32} />
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Sunrise</span>
        </div>
        <div style={{ textAlign: "right", lineHeight: "1.2" }}>
          <div className="card-value" style={{ fontSize: "18px" }}>{sunrise || "6:32 AM"}</div>
          <div style={{ fontSize: "11px", color: "#98989d" }}>{sunriseOffset}</div>
        </div>
      </div>

      {/* Sunset List Item */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SunsetImage size={32} />
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Sunset</span>
        </div>
        <div style={{ textAlign: "right", lineHeight: "1.2" }}>
          <div className="card-value" style={{ fontSize: "18px" }}>{sunset || "5:42 PM"}</div>
          <div style={{ fontSize: "11px", color: "#98989d" }}>{sunsetOffset}</div>
        </div>
      </div>

    </div>
  );
}