import { 
  Radar, 
  RadarChart as RechartsRadar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

// Recebe stats como prop para ser dinâmico
const MyRadarChart = ({ stats }: { stats: any }) => {
  
  // Normalização básica para os valores caberem no gráfico (0 a 100)
  const data = [
    { subject: 'Mensagens', A: Math.min(stats.totalMessages || 0, 100), fullMark: 100 },
    { subject: 'Pedidos API', A: Math.min(stats.userQueries || 0, 100), fullMark: 100 },
    // Dividimos por 10 para a latência (ex: 600ms vira 60 no gráfico)
    { subject: 'Latência', A: Math.min((stats.averageLoadingTime / 10) || 0, 100), fullMark: 100 },
    // Dividimos os tokens para não estourarem o gráfico
    { subject: 'Tokens', A: Math.min((stats.totalTokensUsed / 20) || 0, 100), fullMark: 100 },
    { subject: 'Erros', A: Math.min(stats.botErrorQueries || 0, 100), fullMark: 100 },
  ];

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--input-border)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text)', fontSize: 13, fontWeight: 'bold' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Métricas"
            dataKey="A"
            stroke="var(--accent)"
            fill="var(--accent)"
            fillOpacity={0.4}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
};

export default MyRadarChart;