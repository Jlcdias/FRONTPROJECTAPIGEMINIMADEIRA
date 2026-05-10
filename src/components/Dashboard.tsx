
import Header from './header';
import Footer from './Footer';
import { useChat } from "./historico";
function Dashboard() {
  const { chatHistory, stats } = useChat();
 //carregamento médio
  return (
    <div>
      <Header />
      <h1>Painel de Controlo</h1>
        <div className="card">
          <h3>Estatísticas do Chat</h3>
          <p>Total de pedidos a API: {stats.totalMessages}</p>
        </div>

        <div className="mt-4">
          <h3>Resumo da Última Atividade</h3>
          {chatHistory.length > 0 ? (
            <p>Última mensagem: {chatHistory[chatHistory.length - 1].text}</p>
          ) : (
            <p>Sem atividade recente.</p>
          )}
        </div>
      <Footer />
    </div>
  )
}

export default Dashboard