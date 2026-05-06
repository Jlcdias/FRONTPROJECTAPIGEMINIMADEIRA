import { useContext } from "react";
import {ThemeContext} from '../App';




function LeftMenu() {

    const tema = useContext(ThemeContext);
    console.log("Tema  : "+ tema.theme)
  return (
    <div className="col-3 d-flex flex-column vh-80" data-bs-theme={tema}>
        <div className="row justify-content-center align-items-center">
         Histórico de pesquisa
        </div>
        <div className="row mt-auto mb-3 border">
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("ligth") }>Ligth button</button></div>
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("dark")}>Dark button</button></div>
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("custom-made-theme")}>Blue button</button></div>            
        </div>
    </div>
  )
}

export default LeftMenu