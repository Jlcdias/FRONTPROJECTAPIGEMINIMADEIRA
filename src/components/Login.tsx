import React from 'react';
import account from '../../img/account.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';

// import { App } from '../App';
import { useNavigate } from 'react-router-dom';
function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin=async(e:React.FormEvent)=>{
        e.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, password );
            console.log("User Logged In Sucssufuly");
            navigate("/content");
        }
        catch (error){
            console.log
        }
    }
  return (
    
<>
  <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <img src={account} alt="logotipo" className="login-logo" />
      <p>Introduza os seus dados para aceder</p>
      
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          onChange={(event) => setEmail(event.target.value)} 
          value={email} 
          id="email" 
          placeholder="exemplo@dominio.com"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Palavra-passe</label>
        <input 
          type="password" 
          onChange={(event) => setPassword(event.target.value)} 
          value={password} 
          id="password" 
          placeholder="joaodascouves" 
        />
      </div>

      <button type="submit" className="login-button">Entrar</button>
    </form>
  </div>
</>
  )
}

export default Login
// onClick={(e)=>target.value}