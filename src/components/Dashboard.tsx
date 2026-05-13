
import Header from './header';
import Footer from './Footer';
import { useChat } from "./historico";
import dashboard from '../../img/dashboard.png'; // Import the image
import MyRadarChart from './SimpleRadarChart'; // Import the radar chart

function Dashboard() {
  const { chatHistory, stats } = useChat();
 //carregamento médio
  return (
    <div className="App dashboard-container">
      <Header />
      <div className="dashboard-header">
        <img src={dashboard} alt="Dashboard" className="dashboard-image" />
        <h1 className="dashboard-title">Painel de Controlo</h1>
      </div>
      
      <div className="chatBox dashboard-content">
        <div className="card stats-card">
          <h3 className="stats-title">📊 Estatísticas do Chat</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-icon-requests">✅</p>
              <p className="stat-label">Total de Respostas da API KEY:</p>
              <p className="stat-value">{stats.botQueries}</p>
            </div>
            <div className="stat-item">
              <p className="stat-icon-requests">✉️</p>
              <p className="stat-label">Total de Mensagens Trocadas</p>
              <p className="stat-value">{stats.totalMessages}</p>
            </div>           
            <div className="stat-item">
              <p className="stat-icon-time">⚠️</p>
              <p className="stat-label">Erros do bot</p>
              <p className="stat-value">{stats.botErrorQueries}</p>
            </div>

          </div>
          <div className="stats-grid">
          <div className="stat-item">
              <p className="stat-icon-requests">📞</p>
              <p className="stat-label">Total de pedidos a API</p>
              <p className="stat-value">{stats.totalOrderAPI}</p>
            </div> 
            <div className="stat-item">
              <p className="stat-icon-time">⏱️</p>
              <p className="stat-label">Tempo de carregamento médio</p>
              <p className="stat-value">{stats.averageLoadingTime.toFixed(2)} ms</p>
            </div>            
            <div className="stat-item">
              <p className="stat-icon-tokens">🔢</p>
              <p className="stat-label">Total de tokens utilizados</p>
              <p className="stat-value">{stats.totalTokensUsed}</p>
            </div>

          </div>
        </div>

        <div className="activity-card">
          <h3 className="activity-title">📝 Resumo da Última Atividade</h3>
          {chatHistory.length > 0 ? (
            <p className="activity-text">Última mensagem: {chatHistory[chatHistory.length - 1].text}</p>
          ) : (
            <p className="activity-no-text">Sem atividade recente.</p>
          )}
        </div>

        <div className="chart-card">
          <h3 className="stats-title">📊 Gráfico de Métricas</h3>
          <MyRadarChart stats={stats} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard