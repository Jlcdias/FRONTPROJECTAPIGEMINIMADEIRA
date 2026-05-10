import { useContext } from "react";
import { ThemeContext } from '../App';
import Message from "./Message";

function MainMenu() {
    const tema = useContext(ThemeContext);

    return (
        
        <div className={`col-9 Main-menu ${tema.theme}`}>
            <Message />
        </div>
    );
}

export default MainMenu;