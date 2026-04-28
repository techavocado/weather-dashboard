import React from 'react';
import '../../styles/searchBar.css'; 
import { useState } from 'react';

export default function ImageCard({ onSearch }) {

  let [input, setinput] = useState("");

  let handleChange = (event) => {
    let data = event.target.value;
    setinput(data);
  }

  let submit = (event) => {
    if (event.key === 'Enter') {
      console.log("Searching for:", input);
      
      if (onSearch) {
        onSearch(input); 
      }
      setinput(""); 
    }
  }

  return (
    <div style={{
      background: "#1e1e1e",
      borderRadius: "16px",
      overflow: "hidden",
      padding: "20px",
      height: "110px"
    }}>
      
      <div className="search-section" style={{ margin: 0, maxWidth: "100%" }}>
        
        <div className="spotlight-bar">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" value={input} onChange={handleChange} onKeyDown={submit} placeholder="Search any city or zip code..." />
        </div>

        {/* 2. Space Filler: Trending Locations */}
        <div className="helper-text">
          TRENDING LOCATIONS
        </div>
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