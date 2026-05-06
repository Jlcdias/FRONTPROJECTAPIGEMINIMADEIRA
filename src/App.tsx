import Header from "./components/header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import { createContext, useState } from "react";
import "./styles/theme.css";
import Login from "./components/Login";
export const ThemeContext = createContext<any>(null);
import { BrowserRouter, Route, Routes } from "react-router-dom";




function App() {

  const [theme,setTheme]= useState('dark');
  

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
     <div className="container-fluid text-center  border-primary" data-bs-theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/content" element={<Content/>}/>
      </Routes>
    </BrowserRouter>

     </div>
    </ThemeContext.Provider>
  )
}

export default App
