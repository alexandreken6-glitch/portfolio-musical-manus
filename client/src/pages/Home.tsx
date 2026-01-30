import { Button } from "@/components/ui/button";
import { Music, Heart, Brain, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import SocialMediaSection from "@/components/SocialMediaSection";

export default function Home() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const collections = [
    {
      id: "jesus-judas",
      title: "A Trilogia de Jesus e Judas",
      description: "Uma sequência épica em três atos: a traição, o remorso e a vitória",
      icon: Zap,
      color: "from-red-900 to-red-700",
      songs: [
        { title: "O Beijo da Morte (30 Moedas)", part: "Parte 1" },
        { title: "O Preço da Culpa", part: "Parte 2" },
        { title: "Tetelestai: O Grito da Vitória", part: "Parte 3" }
      ]
    },
    {
      id: "mental-health",
      title: "Explorando a Mente",
      description: "Lutas invisíveis: ansiedade, pensamentos intrusivos e alucinação",
      icon: Brain,
      color: "from-purple-900 to-purple-700",
      songs: [
        { title: "O Labirinto de Vidro", part: "Ansiedade" },
        { title: "O Espelho que Derrete", part: "Alucinação" }
      ]
    },
    {
      id: "personal",
      title: "Histórias Pessoais",
      description: "Celebrando amor, gratidão e misericórdia",
      icon: Heart,
      color: "from-pink-600 to-rose-600",
      songs: [
        { title: "A Primeira Pedra", part: "Misericórdia" },
        { title: "Ponte de Saudade (De Tóquio ao Brasil)", part: "Homenagem" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Manus Music Portfolio</h1>
              <p className="text-slate-400 text-sm">Uma jornada musical através da fé, luta e amor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Composições que Tocam a <span className="text-amber-400">Alma</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Explore uma coleção de músicas que exploram a fé, a saúde mental e o amor incondicional. 
            Cada composição vem com letras, prompts de áudio e vídeo para inspirar sua criação.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {collections.map((collection) => {
            const Icon = collection.icon;
            const isActive = activeCollection === collection.id;
            
            return (
              <div
                key={collection.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  isActive ? "ring-2 ring-amber-400" : ""
                }`}
                onClick={() => setActiveCollection(isActive ? null : collection.id)}
              >
                <div className={`bg-gradient-to-br ${collection.color} p-8 rounded-lg h-full transform group-hover:scale-105 transition-transform`}>
                  <Icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                  <p className="text-white/90 mb-6">{collection.description}</p>
                  
                  {isActive && (
                    <div className="mt-6 space-y-3 bg-black/30 p-4 rounded-lg">
                      {collection.songs.map((song, idx) => (
                        <div key={idx} className="text-white/80 text-sm">
                          <p className="font-semibold">{song.title}</p>
                          <p className="text-white/60 text-xs">{song.part}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Link href={`/collection/${collection.id}`}>
                    <Button 
                      variant="secondary" 
                      className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white"
                    >
                      {isActive ? "Fechar" : "Explorar"}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Section */}
        <section className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-800/50 rounded-lg p-12 mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Destaque: Tetelestai</h3>
          <p className="text-slate-300 mb-6">
            O clímax da trilogia de Jesus e Judas. Uma música épica sobre vitória, redenção e o poder transformador do sacrifício.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-3">Sobre a Música</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Tetelestai: O Grito da Vitória" encerra a trilogia com autoridade absoluta. 
                O termo "Tetelestai" significa "Está Consumado" em grego - a dívida foi paga integralmente.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-3">Recursos</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>✓ Letra completa</li>
                <li>✓ Prompt de Áudio (Epic Trap)</li>
                <li>✓ Prompt de Vídeo (Cinematográfico)</li>
                <li>✓ Análise temática</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <SocialMediaSection />

        {/* CTA Section */}
        <section className="text-center py-12">
          <h3 className="text-2xl font-bold text-white mb-4">Pronto para Explorar?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Cada composição é uma porta para um mundo diferente. 
            Clique nas coleções acima para descobrir letras, prompts e histórias completas.
          </p>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            Começar a Explorar
          </Button>
        </section>
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
