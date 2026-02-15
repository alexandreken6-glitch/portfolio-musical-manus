import { Play, Share2, Heart, ChevronDown, Facebook, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function JesusAteWeyda() {
  const [showLyrics, setShowLyrics] = useState(false);
  const [testimonyName, setTestimonyName] = useState("");
  const [testimonyMessage, setTestimonyMessage] = useState("");
  
  const { data: testimonies, refetch: refetchTestimonies } = trpc.testimonies.list.useQuery({ limit: 20 });
  const addTestimony = trpc.testimonies.add.useMutation({
    onSuccess: () => {
      toast.success("Testemunho compartilhado!", {
        description: "Obrigado por compartilhar sua experiência de fé."
      });
      setTestimonyName("");
      setTestimonyMessage("");
      refetchTestimonies();
    },
    onError: () => {
      toast.error("Erro ao enviar", {
        description: "Tente novamente mais tarde."
      });
    }
  });
  
  const handleSubmitTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonyName.trim() || !testimonyMessage.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    if (testimonyMessage.length < 10) {
      toast.error("Mensagem muito curta", {
        description: "Compartilhe um pouco mais sobre sua experiência."
      });
      return;
    }
    addTestimony.mutate({ name: testimonyName, message: testimonyMessage });
  };
  
  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const text = "De Jesus até Weyda - Uma jornada de 2000 anos de amor 🙏💙";
    
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copiado!", {
        description: "Compartilhe esta mensagem com outras pessoas."
      });
    }
  };
  
  const audioUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031543551/bnTOoSkLRrXKPkwl.mp3";

  const timeline = [
    {
      year: "30 d.C.",
      title: "Jesus na Galileia",
      description: "Pregando amor e paz. 'Amai uns aos outros'",
      icon: "✝️"
    },
    {
      year: "33-100 d.C.",
      title: "Os Discípulos",
      description: "Pedro, Paulo e João espalhando a mensagem",
      icon: "📖"
    },
    {
      year: "100-300 d.C.",
      title: "Perseguições",
      description: "Mártires no Coliseu, fé que não se apagou",
      icon: "🔥"
    },
    {
      year: "Idade Média",
      title: "Crescimento da Igreja",
      description: "Igreja se expandindo, preservação da fé",
      icon: "⛪"
    },
    {
      year: "Século 16",
      title: "Reforma Protestante",
      description: "Lutero, Calvino, Wesley - Bíblia para o povo",
      icon: "📜"
    },
    {
      year: "Século 18-19",
      title: "Missionários",
      description: "Hudson Taylor, William Carey - Evangelho cruzando oceanos",
      icon: "🌍"
    },
    {
      year: "Século 20",
      title: "Brasil",
      description: "Igrejas, avivamentos, curas e milagres",
      icon: "🇧🇷"
    },
    {
      year: "Hoje",
      title: "Weyda",
      description: "Orando nas ruas, transformando vidas",
      icon: "🙏"
    }
  ];

  const lyrics = [
    {
      section: "INTRO",
      lines: [
        "Há dois mil anos atrás...",
        "Na Galileia...",
        "Uma mensagem começou...",
        "E nunca mais parou..."
      ]
    },
    {
      section: "VERSO 1 - Jesus e os Discípulos",
      lines: [
        "Galileia, dois mil anos atrás",
        "Jesus pregando amor, ensinando a paz",
        "'Amai uns aos outros', Ele dizia",
        "E o mundo nunca mais seria o mesmo desde aquele dia",
        "",
        "Pedro, João, Tiago ao Seu lado",
        "Doze homens simples, mas transformados",
        "Pescadores, cobradores de impostos, gente comum",
        "Mas carregavam uma mensagem que mudaria cada um",
        "",
        "'Ide por todo o mundo e pregai o evangelho'",
        "Foram as últimas palavras, o último conselho",
        "E eles foram, mesmo com medo, mesmo com dor",
        "Levando a mensagem do maior amor"
      ]
    },
    {
      section: "REFRÃO",
      lines: [
        "De Jesus até Weyda, a mensagem não parou",
        "Atravessou dois mil anos, o tempo não apagou",
        "De geração em geração, de coração em coração",
        "O amor de Cristo vivo, ainda traz transformação",
        "",
        "De Jesus até Weyda, a chama não se apagou",
        "Nas ruas, nas praças, onde alguém orou",
        "A mesma mensagem que mudou Pedro e João",
        "Hoje muda vidas, ainda traz salvação"
      ]
    },
    {
      section: "VERSO 2 - Através dos Séculos",
      lines: [
        "Séculos se passaram, perseguições vieram",
        "Mártires morreram, mas a fé não perderam",
        "No Coliseu de Roma, cristãos foram lançados aos leões",
        "Mas mesmo na morte, cantavam suas canções",
        "",
        "Idade Média, a igreja cresceu",
        "Reformas vieram, a Bíblia se abriu, Deus não esqueceu",
        "Lutero, Calvino, Wesley pregando",
        "A mensagem de Jesus continuava se espalhando",
        "",
        "Missionários cruzaram oceanos, enfrentaram tempestades",
        "Levando o evangelho para todas as cidades",
        "Hudson Taylor na China, William Carey na Índia",
        "A mensagem de amor não conhecia fronteira, não tinha dia"
      ]
    },
    {
      section: "PONTE - Reflexiva",
      lines: [
        "E eu penso...",
        "Como é que uma mensagem de dois mil anos atrás",
        "Ainda tem poder pra mudar vidas, trazer paz?",
        "",
        "Como é que palavras ditas na Galileia",
        "Ainda ecoam hoje, ainda trazem esperança, ainda iluminam a aldeia?",
        "",
        "É porque não é só história...",
        "Não é só religião...",
        "É Jesus vivo, presente, real",
        "Tocando cada coração..."
      ]
    },
    {
      section: "VERSO 3 - O Encontro com Weyda",
      lines: [
        "E aí eu tava na rua, num momento difícil",
        "Perdido, sem direção, coração frágil",
        "E do nada eu vejo ela, Weyda, orando pelas pessoas",
        "Mãos estendidas, palavras poderosas",
        "",
        "A gente conversou, ela falou de Jesus",
        "E cara, o jeito que ela falava, a luz",
        "O amor que ela tinha ao mencionar Seu nome",
        "Me lembrou que Jesus ainda salva, ainda socorre quem tem fome",
        "",
        "Fome de esperança, fome de paz",
        "Fome de saber que alguém ainda se importa, que alguém ainda faz",
        "Diferença nesse mundo tão quebrado",
        "E ali eu vi: Jesus não tá no passado",
        "",
        "Ele tá vivo, presente, real",
        "Na Weyda orando, no amor incondicional",
        "A mesma mensagem que Pedro pregou",
        "Hoje a Weyda prega, e meu coração transformou"
      ]
    },
    {
      section: "VERSO 4 - A Continuação",
      lines: [
        "E agora eu entendo, eu faço parte dessa história",
        "Não sou só espectador, sou parte da trajetória",
        "De Jesus aos discípulos, dos discípulos aos mártires",
        "Dos mártires aos reformadores, dos reformadores aos pregadores",
        "",
        "E dos pregadores até a Weyda na rua",
        "E da Weyda até mim, e de mim pra você, a mensagem continua",
        "Não é coincidência, é propósito divino",
        "Deus usando pessoas comuns pra cumprir Seu destino"
      ]
    },
    {
      section: "OUTRO",
      lines: [
        "De Jesus até Weyda...",
        "E de Weyda até você...",
        "A mensagem continua...",
        "E nunca vai morrer...",
        "",
        "Porque Jesus não é passado...",
        "Ele é presente, Ele é real...",
        "E enquanto houver alguém orando nas ruas...",
        "A mensagem será imortal...",
        "",
        "Obrigado, Weyda.",
        "Por me lembrar que Jesus ainda está aqui."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(https://files.manuscdn.com/user_upload_by_module/session_file/310419663031543551/dWntBPBVQNpbsmvj.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/50 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 inline-block">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
              Trap Gospel
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            De Jesus<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              até Weyda
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-200 mb-8 font-light">
            2000 Anos de Amor
          </p>
          
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
            Uma jornada emocional que conecta o passado ao presente, mostrando como 
            os ensinamentos de Jesus atravessaram 2000 anos até chegar em uma garota 
            comum orando nas ruas.
          </p>
          
          {/* Audio Player */}
          <div className="mb-8">
            <audio 
              controls 
              className="w-full max-w-2xl mx-auto"
              style={{
                filter: 'sepia(20%) saturate(70%) hue-rotate(15deg)',
                borderRadius: '8px'
              }}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-400 text-amber-400 hover:bg-amber-400/10"
              onClick={() => handleShare()}
            >
              <Heart className="w-5 h-5 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </div>
      </section>

      {/* Mensagem Central */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Mensagem que Atravessou o Tempo
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            O amor de Jesus não é história antiga - ele está <span className="text-amber-400 font-semibold">vivo</span>, 
            <span className="text-amber-400 font-semibold"> presente</span> e 
            <span className="text-amber-400 font-semibold"> real</span>, manifestando-se através de pessoas comuns 
            que escolhem amar e servir aos outros. Weyda é a continuação da obra que Jesus começou, 
            e cada um de nós pode ser parte dessa história.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            A Jornada de 2000 Anos
          </h2>
          
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-blue-400 to-amber-400 -translate-x-1/2" />
            
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <Card className="p-6 bg-slate-900/80 border-slate-800 hover:border-amber-400/50 transition-all">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="text-amber-400 font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </Card>
                </div>
                
                {/* Ponto central */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 border-4 border-slate-950 z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Encontro */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-950/50 to-slate-950/50 border-amber-400/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              O Encontro com Weyda
            </h2>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                Eu estava na rua, num momento difícil. Perdido, sem direção, coração frágil. 
                E do nada eu vejo ela, <span className="text-amber-400 font-semibold">Weyda</span>, 
                orando pelas pessoas. Mãos estendidas, palavras poderosas.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-4">
                A gente conversou, ela falou de Jesus. E cara, o jeito que ela falava, a luz. 
                O amor que ela tinha ao mencionar Seu nome me lembrou que Jesus ainda salva, 
                ainda socorre quem tem fome.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-4">
                Fome de esperança, fome de paz. Fome de saber que alguém ainda se importa, 
                que alguém ainda faz diferença nesse mundo tão quebrado.
              </p>
              
              <p className="text-amber-400 text-xl font-semibold text-center mt-8">
                E ali eu vi: Jesus não tá no passado. Ele tá vivo, presente, real.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Letra */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Letra Completa
            </h2>
            <Button 
              onClick={() => setShowLyrics(!showLyrics)}
              variant="outline"
              className="border-amber-400 text-amber-400 hover:bg-amber-400/10"
            >
              {showLyrics ? "Ocultar Letra" : "Ver Letra Completa"}
            </Button>
          </div>
          
          {showLyrics && (
            <div className="space-y-8">
              {lyrics.map((part, index) => (
                <Card key={index} className="p-6 bg-slate-900/80 border-slate-800">
                  <h3 className="text-xl font-bold text-amber-400 mb-4">{part.section}</h3>
                  <div className="space-y-2">
                    {part.lines.map((line, lineIndex) => (
                      <p 
                        key={lineIndex} 
                        className={`${line === "" ? "h-4" : "text-slate-300"}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Faça Parte Dessa História
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            De Jesus até Weyda... e de Weyda até você... a mensagem continua. 
            Não é coincidência, é propósito divino. Deus usando pessoas comuns 
            para cumprir Seu destino.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
              onClick={() => handleShare()}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar Esta Mensagem
            </Button>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="icon"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-sky-500 text-sky-500 hover:bg-sky-500/10"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => handleShare("whatsapp")}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-slate-400 mt-12 italic">
            "Porque Jesus não é passado... Ele é presente, Ele é real... 
            E enquanto houver alguém orando nas ruas... A mensagem será imortal."
          </p>
        </div>
      </section>

      {/* Testimonies Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-blue-950/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Compartilhe Sua História
            </h2>
            <p className="text-xl text-slate-300">
              Você também faz parte dessa jornada de 2000 anos. Compartilhe como Jesus tocou sua vida.
            </p>
          </div>

          {/* Testimony Form */}
          <Card className="bg-slate-900/50 border-amber-500/20 p-8 mb-12">
            <form onSubmit={handleSubmitTestimony} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Seu Nome
                </label>
                <Input
                  value={testimonyName}
                  onChange={(e) => setTestimonyName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Seu Testemunho
                </label>
                <Textarea
                  value={testimonyMessage}
                  onChange={(e) => setTestimonyMessage(e.target.value)}
                  placeholder="Compartilhe como Jesus tocou sua vida..."
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-sm text-slate-400 mt-2">
                  {testimonyMessage.length}/1000 caracteres
                </p>
              </div>
              <Button
                type="submit"
                disabled={addTestimony.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
              >
                {addTestimony.isPending ? "Enviando..." : "🙏 Compartilhar Testemunho"}
              </Button>
            </form>
          </Card>

          {/* Testimonies List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Testemunhos da Comunidade
            </h3>
            {testimonies && testimonies.length > 0 ? (
              testimonies.map((testimony) => (
                <Card key={testimony.id} className="bg-slate-900/30 border-blue-500/20 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {testimony.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{testimony.name}</h4>
                        <span className="text-sm text-slate-400">
                          • {new Date(testimony.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {testimony.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="bg-slate-900/30 border-slate-700 p-12 text-center">
                <p className="text-slate-400 text-lg">
                  Seja o primeiro a compartilhar seu testemunho! 🙏
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 mb-4">
            Obrigado, Weyda. Por me lembrar que Jesus ainda está aqui.
          </p>
          <p className="text-amber-400 font-semibold">
            🙏 De Jesus até Weyda - 2000 Anos de Amor 💙
          </p>
        </div>
      </footer>
    </div>
  );
}
