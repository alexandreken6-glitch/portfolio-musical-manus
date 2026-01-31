import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Music, Eye, Share2, TrendingUp, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: topSongs, isLoading: topSongsLoading } = trpc.stats.topSongs.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: trafficData, isLoading: trafficLoading } = trpc.stats.trafficBySource.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Faça login para acessar o dashboard
          </h1>
          <p className="text-slate-400">
            Você precisa estar autenticado para ver suas estatísticas.
          </p>
        </div>
      </div>
    );
  }

  const trafficChartData = trafficData
    ? Object.entries(trafficData).map(([source, count]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1),
        value: count,
      }))
    : [];

  const COLORS = ["#a855f7", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard de Estatísticas</h1>
          <p className="text-slate-400">
            Acompanhe o desempenho de suas músicas e o tráfego do site
          </p>
        </div>

        {/* Top Songs Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Top 5 Músicas Mais Visitadas</h2>
            </div>

            {topSongsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : topSongs && topSongs.length > 0 ? (
              <div className="space-y-4">
                {topSongs.map((song, index) => (
                  <div key={song.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-purple-400">#{index + 1}</span>
                        <div>
                          <p className="font-semibold text-white">{song.songTitle}</p>
                          <p className="text-slate-400 text-sm">ID: {song.songId}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-slate-800/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-400 text-xs">Visualizações</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{song.views}</p>
                      </div>

                      <div className="bg-slate-800/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Music className="w-4 h-4 text-pink-400" />
                          <span className="text-slate-400 text-xs">Curtidas</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{song.likes}</p>
                      </div>

                      <div className="bg-slate-800/50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Share2 className="w-4 h-4 text-green-400" />
                          <span className="text-slate-400 text-xs">Compartilhamentos</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{song.shares}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Music className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Nenhum dado de visualização ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Tráfego por Origem</h2>

          {trafficLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : trafficChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">Nenhum dado de tráfego disponível</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-2">Sobre o Dashboard</h3>
          <p className="text-slate-300 text-sm">
            Este dashboard mostra as estatísticas em tempo real de suas músicas. As visualizações são rastreadas automaticamente quando visitantes acessam as páginas. Compartilhamentos e curtidas podem ser incrementados através de interações no site.
          </p>
        </div>
      </div>
    </div>
  );
}
