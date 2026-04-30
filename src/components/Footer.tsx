import React from "react";
import { useContext } from "react";
import {ThemeContext} from '../App';
function Footer() {
    const theme = useContext(ThemeContext);


  return (
    
    <div className="row " data-bs-theme={theme}>
        <div className="col-12 ">Footer</div>
    </div>
  )
}

export default Footer