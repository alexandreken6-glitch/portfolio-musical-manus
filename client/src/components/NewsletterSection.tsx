import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, insira seu email");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Email inválido");
      return;
    }

    setIsLoading(true);

    try {
      // Simular envio (em produção, conectar a um serviço real)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Aqui você pode integrar com Mailchimp, SendGrid, ou outro serviço
      // Por enquanto, apenas mostramos uma mensagem de sucesso
      toast.success(
        "Email registrado! Você receberá atualizações em breve 🎉"
      );
      setEmail("");

      // Rastrear no analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", "newsletter_signup", {
          email_domain: email.split("@")[1],
        });
      }
    } catch (error) {
      toast.error("Erro ao registrar email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-y border-slate-800">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            Fique por Dentro
          </h2>
          <p className="text-slate-300 mb-2">
            Receba notificações sobre novos lançamentos, teasers exclusivos e
            conteúdo especial direto no seu email.
          </p>
          <p className="text-sm text-slate-400">
            Sem spam, apenas música que toca a alma. ✨
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isLoading ? "Enviando..." : "Inscrever"}
            <Send className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          Respeitamos sua privacidade. Você pode se desinscrever a qualquer
          momento.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-2xl font-bold text-purple-400">5+</p>
            <p className="text-xs text-slate-400">Composições</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-2xl font-bold text-pink-400">3</p>
            <p className="text-xs text-slate-400">Coleções</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-2xl font-bold text-cyan-400">∞</p>
            <p className="text-xs text-slate-400">Possibilidades</p>
          </div>
        </div>
      </div>
    </section>
  );
}
