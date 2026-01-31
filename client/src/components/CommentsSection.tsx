import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CommentsSectionProps {
  songId: string;
  songTitle: string;
}

export default function CommentsSection({
  songId,
  songTitle,
}: CommentsSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState(user?.name || "");

  const { data: comments, isLoading, refetch } = trpc.comments.list.useQuery({
    songId,
  });

  const addCommentMutation = trpc.comments.add.useMutation({
    onSuccess: () => {
      toast.success("Comentário enviado para moderação!");
      setCommentText("");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao enviar comentário: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }

    if (!userName.trim()) {
      toast.error("Por favor, insira seu nome");
      return;
    }

    addCommentMutation.mutate({
      songId,
      userName,
      content: commentText,
      userId: user?.id,
    });
  };

  return (
    <div className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-pink-400" />
        <h3 className="text-lg font-bold text-white">
          Comentários ({comments?.length || 0})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6 pb-6 border-b border-slate-700">
        <div className="space-y-4">
          {!isAuthenticated && (
            <input
              type="text"
              placeholder="Seu nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          )}

          <textarea
            placeholder="Compartilhe sua opinião sobre esta música..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
          />

          <Button
            type="submit"
            disabled={addCommentMutation.isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            {addCommentMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar Comentário
              </>
            )}
          </Button>

          <p className="text-slate-400 text-xs">
            Seu comentário será revisado antes de ser publicado.
          </p>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-white">{comment.userName}</p>
                <span className="text-xs text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="text-slate-300 text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Nenhum comentário ainda</p>
          <p className="text-slate-500 text-sm">
            Seja o primeiro a comentar sobre esta música!
          </p>
        </div>
      )}
    </div>
  );
}
