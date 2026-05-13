import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipagem para as mensagens
interface MessageItem {
  role: 'user' | 'model';
  text: string;
}



// O que o contexto vai entregar aos componentes
interface ChatContextType {
  chatHistory: MessageItem[];
  setChatHistory: React.Dispatch<React.SetStateAction<MessageItem[]>>;
  addMessage: (role: 'user' | 'model', text: string) => void;
  addLoadingTime: (time: number) => void;
  addTokensUsed: (tokens: number) => void;
  stats: { totalMessages: number; averageLoadingTime: number; totalTokensUsed: number; userQueries: number; botQueries: number; botErrorQueries: number, totalOrderAPI:number };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistory] = useState<MessageItem[]>([]);
  const [loadingTimes, setLoadingTimes] = useState<number[]>([]);
  const [totalTokensUsed, setTotalTokensUsed] = useState<number>(0);
  
  // Limpa o localStorage ao montar o provider (para garantir que não haja dados antigos)
  useEffect(() => {
    localStorage.removeItem('chatHistory');
  }, []);

  // Função utilitária para facilitar a adição de mensagens
  const addMessage = (role: 'user' | 'model', text: string) => {
    setChatHistory((prev) => [...prev, { role, text }]);
  };

  const addLoadingTime = (time: number) => {
    setLoadingTimes((prev) => [...prev, time]);
  };

  const addTokensUsed = (tokens: number) => {
    setTotalTokensUsed((prev) => prev + tokens);
  };

  const stats = {
    totalMessages: chatHistory.length,
    userQueries: chatHistory.filter(m => m.role === 'user').length,
    botQueries: chatHistory.filter(m => m.role === 'model').length,
    botErrorQueries: chatHistory.filter(m => m.role === 'model' && m.text === 'Erro ao gerar conteúdo. Verifica a tua chave API.').length,
    totalOrderAPI : chatHistory.filter(m => m.role === 'model' && m.text !== 'Erro ao gerar conteúdo. Verifica a tua chave API.').length,
    averageLoadingTime: loadingTimes.length > 0 ? loadingTimes.reduce((a, b) => a + b, 0) / loadingTimes.length : 0,
    totalTokensUsed
  };
  return (
    <ChatContext.Provider value={{ chatHistory, setChatHistory, addMessage, addLoadingTime, addTokensUsed, stats }}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw Error("useChat deve ser usado dentro de um ChatProvider");
  }
  return context;
}