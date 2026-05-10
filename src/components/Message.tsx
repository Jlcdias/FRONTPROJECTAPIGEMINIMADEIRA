
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import google from "../scripts/google"
import { useChat } from "./historico";
interface MessageItem {
  role: 'user' | 'model';
  text: string;
}




const genAI = new GoogleGenerativeAI(google.key);

function Message() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { chatHistory, addMessage } = useChat();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!answer.trim()) return;

    const userMessage = answer;
    setLoading(true);
    setAnswer("");

    addMessage("user", userMessage);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(userMessage);
      const botResponse = result.response.text();

      addMessage("model", botResponse);


    } catch (error) {
      addMessage("model", "Erro ao gerar conteúdo. Verifica a tua chave API.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="App" style={{ padding: "20px" , height:"85vh", margin:"20px"}}>     
    <h1>Gemini Simple Demo</h1>
      <div  className="chatBox">
        {chatHistory.map((msg, index) => (
          <div key={index} className="chatMessages" style={{ 
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            backgroundColor: msg.role === "user" ? "#007bff" : "#f1f1f1",
            color: msg.role === "user" ? "white" : "black"}}>

            {msg.text}

          </div>
        ))}
        {loading && <p style={{ fontSize: "12px", color: "gray" }}>Gemini está a pensar...</p>}
      </div>
      <form className="inputForm" onSubmit={handleSubmit} >
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder=""
          className="inpuTextBox"
        />
        <button className="submitButton" type="submit" 
         disabled={loading}>{loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      </div>
  )
}

export default Message