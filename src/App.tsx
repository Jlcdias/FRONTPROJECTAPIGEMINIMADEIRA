import Content from "./components/Content"
import { createContext, useState } from "react";
import "./styles/theme.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ChatProvider } from './components/historico';
import { ProtectedRoute } from "./components/ProtectedRoute";
export const ThemeContext = createContext<any>(null);


function App() {

  const [theme,setTheme]= useState('dark');
  

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ChatProvider>
      <div className={`app-root container-fluid text-center theme-${theme}`} data-bs-theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />

            <Route path="/content" element={<ProtectedRoute><Content/></ProtectedRoute>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </div>
      </ChatProvider>
    </ThemeContext.Provider>
  )
}

export default App
