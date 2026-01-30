import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Zap } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function Collection() {
  const [, params] = useRoute("/collection/:id");
  const collectionId = params?.id;

  const collections: Record<string, any> = {
    "jesus-judas": {
      title: "A Trilogia de Jesus e Judas",
      color: "from-red-900 to-red-700",
      description: "Uma sequência épica que explora a traição, o remorso e a vitória final",
      songs: [
        {
          id: "beijo-morte",
          title: "O Beijo da Morte (30 Moedas)",
          part: "Parte 1",
          style: "Dark Rap Pesado",
          excerpt: "Olha nos olhos, vê o reflexo da ambição\nTrês anos de estrada, comendo do mesmo pão",
          themes: ["Traição", "Ganância", "Amizade Quebrada"],
          audioPrompt: "Style: Dark Rap Pesado, Boom Bap, Clima tenso, Rimas cruas e diretas"
        },
        {
          id: "preco-culpa",
          title: "O Preço da Culpa",
          part: "Parte 2",
          style: "Dark Rap com Contraste",
          excerpt: "O sol nasceu, mas a luz não me alcança\nMergulho no raso e sinto que tô no fundo do poço",
          themes: ["Remorso", "Solidão", "Fidelidade"],
          audioPrompt: "Style: Dark Trap, Batida pesada mas melancólica, Contraste entre desespero e esperança"
        },
        {
          id: "tetelestai",
          title: "Tetelestai: O Grito da Vitória",
          part: "Parte 3",
          style: "Epic Trap Triunfante",
          excerpt: "O céu se fechou, o meio-dia virou noite\nMas não se engane, ninguém tirou Sua vida",
          themes: ["Vitória", "Redenção", "Ressurreição"],
          audioPrompt: "Style: Epic Trap, Metais poderosos, Coros gloriosos, Transição da escuridão para luz"
        }
      ]
    },
    "mental-health": {
      title: "Explorando a Mente",
      color: "from-purple-900 to-purple-700",
      description: "Músicas que exploram as lutas invisíveis da mente humana",
      songs: [
        {
          id: "labirinto",
          title: "O Labirinto de Vidro",
          part: "Ansiedade",
          style: "Trap Melódico Introspectivo",
          excerpt: "Às vezes o silêncio é o barulho mais alto que eu ouço\nMergulho no raso e sinto que tô no fundo do poço",
          themes: ["Ansiedade", "Pensamentos Intrusivos", "Paz Interior"],
          audioPrompt: "Style: Trap Melódico, Batida constante como batimento cardíaco, Melodias etéreas"
        },
        {
          id: "espelho",
          title: "O Espelho que Derrete",
          part: "Alucinação",
          style: "Dark Trap Experimental",
          excerpt: "As paredes respiram, o teto começa a baixar\nAs cores têm gosto e o som eu consigo tocar",
          themes: ["Alucinação", "Psicose", "Realidade Distorcida"],
          audioPrompt: "Style: Dark Trap Experimental, Glitch effects, Vocais com delay e reverb extremos"
        }
      ]
    },
    "personal": {
      title: "Histórias Pessoais",
      color: "from-pink-600 to-rose-600",
      description: "Composições que celebram o amor, gratidão e misericórdia",
      songs: [
        {
          id: "primeira-pedra",
          title: "A Primeira Pedra",
          part: "Misericórdia",
          style: "Balada Emocional",
          excerpt: "O círculo se fecha, o dedo aponta o erro\nMas no meio do barulho, um silêncio se faz",
          themes: ["Misericórdia", "Julgamento", "Perdão"],
          audioPrompt: "Style: Balada suave, Violão dedilhado, Piano discreto"
        },
        {
          id: "ponte-saudade",
          title: "Ponte de Saudade (De Tóquio ao Brasil)",
          part: "Homenagem",
          style: "Balada Trap",
          excerpt: "Lembro do tempo, a casa cheia, mas a mesa vazia\nTrês bocas pra alimentar, e a senhora, só a guia",
          themes: ["Gratidão", "Saudade", "Amor Incondicional"],
          audioPrompt: "Style: Melodic Trap, Piano melancólico, 808 profundo, Atmosfera emocional"
        }
      ]
    }
  };

  const collection = collections[collectionId || ""];

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Coleção não encontrada</h1>
          <Link href="/">
            <Button variant="outline">Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className={`bg-gradient-to-r ${collection.color} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-4">{collection.title}</h1>
          <p className="text-xl text-white/90">{collection.description}</p>
        </div>
      </section>

      {/* Songs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {collection.songs.map((song: any, idx: number) => (
            <div key={song.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-400">{song.part}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{song.title}</h2>
                  <p className="text-slate-400 mt-1">{song.style}</p>
                </div>
                <span className="text-4xl font-bold text-slate-700">{idx + 1}</span>
              </div>

              {/* Excerpt */}
              <div className="bg-slate-900/50 rounded p-4 my-6 border-l-4 border-amber-400">
                <p className="text-slate-300 whitespace-pre-line text-sm font-mono">
                  {song.excerpt}
                </p>
              </div>

              {/* Themes */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Temas</h4>
                <div className="flex flex-wrap gap-2">
                  {song.themes.map((theme: string) => (
                    <span key={theme} className="bg-slate-700/50 text-slate-200 px-3 py-1 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audio Prompt */}
              <div className="bg-purple-900/20 border border-purple-700/50 rounded p-4 mb-6">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Prompt de Áudio</h4>
                <p className="text-slate-300 text-sm">{song.audioPrompt}</p>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
              <Link href={`/song/${song.id}`}>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Ver Letra Completa
                </Button>
              </Link>
                <Button variant="outline" className="text-slate-300 border-slate-600 hover:border-slate-500">
                  Prompts de Vídeo
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Criado com ❤️ por Manus AI | Portfólio Musical © 2026</p>
        </div>
      </footer>
    </div>
  );
}
