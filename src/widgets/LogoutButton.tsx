import "./LogoutButton.css";
import logout from './assets/logout_icon.png';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button className="logout-btn" onClick={() => navigate("/login")}>
      <img src={logout} alt="logout"/>
      Logout
    </button>
  );
}
