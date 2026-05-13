
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import google from "../scripts/google"
import { useChat } from "./historico";




const genAI = new GoogleGenerativeAI(google.key);

function Message() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { chatHistory, addMessage, addLoadingTime, addTokensUsed } = useChat();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!answer.trim()) return;

    const userMessage = answer;
    setLoading(true);
    setAnswer("");

    addMessage("user", userMessage);
    const startTime = Date.now();
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(userMessage);
      const botResponse = result.response.text();
      const tokensUsed = result.response.usageMetadata?.totalTokenCount || 0;

      addMessage("model", botResponse);
      addTokensUsed(tokensUsed);


    } catch (error) {
      addMessage("model", "Erro ao gerar conteúdo. Verifica a tua chave API.");
      console.error(error);
    } finally {
      const endTime = Date.now();
      const duration = endTime - startTime;
      addLoadingTime(duration);
      setLoading(false);
    }
  }
  return (
    <div className="App message-container">     
      <h1 className="message-title">Gemini Simple Demo</h1>
      <div className="chatBox">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chatMessages ${msg.role === "user" ? "user" : "model"}`}>
            {msg.text}
          </div>
        ))}
        {loading && <p className="loading-text">Gemini está a pensar...</p>}
      </div>
      <form className="inputForm" onSubmit={handleSubmit} >
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder=""
          className="inputTextBox"
        />
        <button className="submitButton" type="submit" 
         disabled={loading}>{loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      </div>
  )
}

export default Message