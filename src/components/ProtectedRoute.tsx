import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase"; // Ajuste o caminho se necessário
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuta o estado da autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>A carregar...</div>;

  if (!user) {
    // Se não houver user, manda para o login
    return <Navigate to="/" />;
  }

  return children;
};