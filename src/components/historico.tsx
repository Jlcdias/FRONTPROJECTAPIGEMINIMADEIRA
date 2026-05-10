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
  stats: { totalMessages: number };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistory] = useState<MessageItem[]>([]);
  
  // Limpa o localStorage ao montar o provider (para garantir que não haja dados antigos)
  useEffect(() => {
    localStorage.removeItem('chatHistory');
  }, []);

  // Função utilitária para facilitar a adição de mensagens
  const addMessage = (role: 'user' | 'model', text: string) => {
    setChatHistory((prev) => [...prev, { role, text }]);
  };

  const stats = {
    totalMessages: chatHistory.length,
    userQueries: chatHistory.filter(m => m.role === 'user').length
  };
  return (
    <ChatContext.Provider value={{ chatHistory, setChatHistory, addMessage,stats }}>
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