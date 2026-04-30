import React from 'react';
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
    <form onSubmit={handleLogin}>
        <input type="email" onChange={(event)=>{setEmail(event.target.value)}} value={email}  id="email" placeholder="Email:123@domain.com"/>
        <input type="password" onChange={(event)=>{setPassword(event.target.value)}} value={password} id="password" placeholder="Password:joaodascouves" />
        <button type="submit" >Loggin</button>
    </form>
    </>
  )
}

export default Login
// onClick={(e)=>target.value}