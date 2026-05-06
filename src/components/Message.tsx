
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import google from "../scripts/google"

interface MessageItem {
  role: 'user' | 'model';
  text: string;
}

const genAI = new GoogleGenerativeAI(google.key);



function Message() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [chatHistory, setChatHistory] = useState<MessageItem[]>([]);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userMessage = answer;
    setLoading(true);


    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(answer);
      const botResponse = result.response.text();
  


    setChatHistory((prev) => [...prev, { role: "model", text: botResponse }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { role: "model", text: "Error generating content. Check your API key." }]);
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div className="App" style={{ padding: "20px" , height:"85vh", margin:"2px"}}>     
    <h1>Gemini Simple Demo</h1>
<div  className="chat message" style={{  
        height: "80%", 
        flex:1,
        overflowY: "auto", 
        padding: "10px", 
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ 
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            backgroundColor: msg.role === "user" ? "#007bff" : "#f1f1f1",
            color: msg.role === "user" ? "white" : "black",
            padding: "8px 12px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "80%"
          }}>
            {msg.text}
          </div>
        ))}
        {loading && <p style={{ fontSize: "12px", color: "gray" }}>Gemini está a pensar...</p>}
      </div>
      <form onSubmit={handleSubmit} 
      style={{padding: "20px", 
              borderTop: "1px solid #ccc",
              display: "flex",       // Ativa o Flexbox
              gap: "10px",           // Espaço entre o input e o botão
              backgroundColor: "white",
              width: "100%",         // Garante que o form ocupa a largura do contentor
              boxSizing: "border-box"
      }}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder=""
          style={{ width: "800px", 
            padding: "10px",
            flex: 1,                
            borderRadius: "5px", 
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none"}}
        />
        <button type="submit" 
        style={{ padding: "10px 25px",   // Largura interna do botão
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap"
        }}
         disabled={loading}>{loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      </div>
  )
}

export default Message