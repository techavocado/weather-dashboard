import React, { useState, useEffect } from "react";
import "../../styles/searchBar.css";

export default function ImageCard({ onSearch, error }) {
  const [input, setInput] = useState("");
  const [showError, setShowError] = useState(false);

  // Auto-hide error after 2s
  useEffect(() => {
    if (error) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (event) => {
    setInput(event.target.value);
    setShowError(false);
  };

  const submit = (event) => {
    if (event.key === "Enter") {
      if (!input.trim()) return;

      onSearch?.(input);

      if (!showError) {
        setInput("");
      }
    }
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        borderRadius: "16px",
        overflow: "hidden",
        padding: "20px",
        height: "130px"
      }}
    >
      <div className="search-section" style={{ margin: 0, maxWidth: "100%" }}>
        
        <div className="spotlight-bar" style={{ border: showError ? "1px solid #ff4d4f" : "1px solid #2a2a2a" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: "20px" }} >
            <circle cx="11" cy="11" r="7" />
            <line x1="20" y1="20" x2="16.5" y2="16.5" />
          </svg>

          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={submit}
            placeholder="Search any city or zip code..."
            style={{ background: "transparent", border: "none", outline: "none", color: "#eee", marginLeft: "10px", width: "100%" }}
          />
        </div>

        {showError && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "6px" }}>
            City not found. Please try again.
          </div>
        )}

        {/* Trending */}
        <div className="helper-text">TRENDING LOCATIONS</div>

        <div className="popular-tags">
          <div className="city-tag">📍 Mumbai</div>
          <div className="city-tag">New York</div>
          <div className="city-tag">Tokyo</div>
          <div className="city-tag">London</div>
        </div>
      </div>
    </div>
  );
}