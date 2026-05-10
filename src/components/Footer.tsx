
import { useContext } from "react";
import {ThemeContext} from '../App';
function Footer() {
    const theme = useContext(ThemeContext);


  return (
    
    <div className="row " data-bs-theme={theme}>
        <div className="col-12 ">
          O Gemini Madeira é IA e pode cometer erros, inclusive sobre pessoas.
          <p>&copy; 2026 GeminiMAdeira. Todos os direitos reservados.</p>
        </div>
    </div>
  )
}

export default Footer