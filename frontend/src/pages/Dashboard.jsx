import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
}