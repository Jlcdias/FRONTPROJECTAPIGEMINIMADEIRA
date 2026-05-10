import { useContext } from "react";
import {ThemeContext} from '../App';
import { useChat } from "./historico";



function LeftMenu() {

    const tema = useContext(ThemeContext);
    console.log("Tema  : "+ tema.theme)
    const { chatHistory } = useChat(); // 

  return (
    <div className="col-3 d-flex flex-column vh-80" data-bs-theme={tema}>
        <div className="row justify-content-center align-items-center">
         Histórico de pesquisa</div>
        <div className="mt-3 history-container">
        {chatHistory.filter(m => m.role === 'user').map((msg, i) => (
          <div key={i} className="history-item text-truncate-custom">
            {msg.text}
          </div>
        ))}
        </div> 
        <div className="row mt-auto mb-3 ">
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("ligth") }>Ligth button</button></div>
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("dark")}>Dark button</button></div>
            <div className="col-4"><button type="button" className="btn btn-primary" onClick={()=>tema.setTheme("custom-made-theme")}>Blue button</button></div>            
        </div>
    </div>
  )
}

export default LeftMenu