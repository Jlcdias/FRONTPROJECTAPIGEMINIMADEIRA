
import dashboardIcon from '../../img/dashboard.png';
import logotipo from '../../img/logotipo.png';
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate(); // 2. Inicializa a função de navegação
  return (
        <div className="row">
          <div className="col-3">   
            <button onClick={() => navigate("/dashboard")} style={{backgroundColor:"transparent", border:"none", color:"black"}}><img src={dashboardIcon} alt="dashboard" style={{ height:"40px"}}/>Dashboard</button>
          </div>
          <div className="col-6">
            <button onClick={() => navigate("/content")} style={{backgroundColor:"transparent", border:"none"}}><img src={logotipo} alt="logotipo" style={{height:"50px"}} /></button>
          </div>
          <div  className="col-3 "  >
            <button onClick={() => navigate("/")} style={{backgroundColor:"transparent", border:"2px solid black",borderRadius:"5px", color:"black"}}>logout</button>
          </div>
        </div>
  )
}

export default Header