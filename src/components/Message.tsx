
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBuh1wy2zvwxFu-lWpUnCqr7IsJMdNWql8");



function Message() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      setResponse("Error generating content. Check your API key.");
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div className="App" style={{ padding: "20px" }}>     
    <h1>Gemini Simple Demo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder=""
          style={{ width: "300px", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }} disabled={loading}>
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong> {response}
      </div>
      </div>
  )
}

export default Message