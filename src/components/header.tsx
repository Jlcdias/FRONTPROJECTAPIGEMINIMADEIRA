
import dashboardIcon from '../../img/dashboard.png';
import logotipo from '../../img/logotipo.png';
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
        <div className="header-row">
          <div>
            <button onClick={() => navigate("/dashboard")} className="header-button"><img src={dashboardIcon} alt="dashboard" className="header-icon"/>Dashboard</button>
          </div>
          <div>
            <button onClick={() => navigate("/content")} className="header-button"><img src={logotipo} alt="logotipo" className="header-logo" /></button>
          </div>
          <div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
  )
}

export default Header