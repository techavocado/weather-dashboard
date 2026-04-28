import { useEffect } from "react";

export default function BlankOverlay({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={fullPageStyle}>
      <button onClick={onClose} style={closeBtn}>
        ✕ Close
      </button>

      <div style={contentContainer}>
        <h1>Full Page Overlay</h1>
        <p>This now behaves like a separate screen.</p>
      </div>
    </div>
  );
}

// 🎨 Styles
const fullPageStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",   // Full Viewport Width
  height: "100vh",  // Full Viewport Height
  background: "#1e1e1e", // Solid background so it feels like a new page
  color: "#fff",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  padding: "40px",
  boxSizing: "border-box",
  overflowY: "auto" // Allows scrolling if content is long
};

const contentContainer = {
  maxWidth: "800px",
  margin: "0 auto",
  width: "100%"
};

const closeBtn = {
  alignSelf: "flex-end",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "20px",
  transition: "0.2s"
};




// Bhai ye bhi ek baar try karna jo sahi lage vahi choose karna 




// import { useEffect } from "react";

// export default function BlankOverlay({ onClose }) {

//   // Disable background scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div style={overlayStyle}>
//       <div style={cardStyle}>
        
//         {/* Close Button */}
//         <button onClick={onClose} style={closeBtn}>
//           ✕
//         </button>

//         {/* Empty Content Area */}
//         <div style={{ height: "200px" }} />

//       </div>
//     </div>
//   );
// }

// // 🎨 Styles
// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0,0,0,0.7)",
//   backdropFilter: "blur(6px)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 999
// };

// const cardStyle = {
//   background: "#1e1e1e",
//   padding: "30px",
//   borderRadius: "16px",
//   width: "320px",
//   height: "250px",
//   position: "relative"
// };

// const closeBtn = {
//   position: "absolute",
//   top: "10px",
//   right: "15px",
//   background: "transparent",
//   border: "none",
//   color: "#fff",
//   fontSize: "18px",
//   cursor: "pointer"
// };