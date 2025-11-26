import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
   const navigate = useNavigate();
  return (
    <div className="home-page">
      <h1>CPU Scheduling Visualizer</h1>
      <button className="home-btn" onClick={()=> navigate("/about")}>Get Started</button>
    </div>
  );
}
