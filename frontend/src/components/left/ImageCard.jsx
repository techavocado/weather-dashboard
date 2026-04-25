export default function ImageCard() {
  return (
    <div style={{
      background: "#1e1e1e",
      borderRadius: "16px",
      overflow: "hidden"
    }}>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="city"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
    </div>
  );
}