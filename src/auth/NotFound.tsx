import { useNavigate } from "react-router-dom";
import magnifying_glass from "./assets/magnifying_glass.png";

import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div style={{ display: "flex", flexDirection: "column" }}>
      <img src={magnifying_glass} style={{ width: "25px", margin: "auto" }} alt="404 NOT FOUND" />
      <h1 style={{ color: "#10275b" }}>Page not found</h1>
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
    </div>
  );
}