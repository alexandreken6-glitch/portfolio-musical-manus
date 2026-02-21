import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function TestimoniesModeration() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: pendingTestimonies, refetch, isLoading } = trpc.testimonies.listPending.useQuery(
    { limit: 100 },
    { enabled: !!user }
  );
  
  const approveMutation = trpc.testimonies.approve.useMutation({
    onSuccess: () => {
      toast.success("Testemunho aprovado!");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao aprovar", { description: error.message });
    }
  });
  
  const rejectMutation = trpc.testimonies.reject.useMutation({
    onSuccess: () => {
      toast.success("Testemunho rejeitado");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao rejeitar", { description: error.message });
    }
  });
  
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="p-8 bg-slate-900/50 border-slate-800">
          <p className="text-slate-300">Você precisa fazer login para acessar esta página.</p>
          <Button className="mt-4" onClick={() => setLocation("/")}>
            Voltar
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Moderação de Testemunhos</h1>
              <p className="text-slate-400 text-sm mt-1">
                {pendingTestimonies?.length || 0} testemunhos pendentes
              </p>
            </div>
            <Button variant="outline" onClick={() => setLocation("/jesus-ate-weyda")}>
              Ver Página Pública
            </Button>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!pendingTestimonies || pendingTestimonies.length === 0 ? (
          <Card className="p-12 bg-slate-900/30 border-slate-800 text-center">
            <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Nenhum testemunho pendente</h2>
            <p className="text-slate-400">
              Todos os testemunhos foram moderados. Novos testemunhos aparecerão aqui.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {pendingTestimonies.map((testimony) => (
              <Card 
                key={testimony.id} 
                className="p-6 bg-slate-900/30 border-slate-800 hover:border-amber-400/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">{testimony.name}</h3>
                      <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                        Pendente
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {testimony.message}
                    </p>
                    <p className="text-slate-500 text-sm mt-3">
                      Enviado em {new Date(testimony.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  
                  <div className="flex md:flex-col gap-2">
                    <Button
                      onClick={() => approveMutation.mutate({ id: testimony.id })}
                      disabled={approveMutation.isPending || rejectMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1 md:flex-none"
                    >
                      {approveMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aprovar
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => rejectMutation.mutate({ id: testimony.id })}
                      disabled={approveMutation.isPending || rejectMutation.isPending}
                      variant="destructive"
                      className="flex-1 md:flex-none"
                    >
                      {rejectMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Rejeitar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
