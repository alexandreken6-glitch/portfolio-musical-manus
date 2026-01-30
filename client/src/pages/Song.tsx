import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import NewsletterSection from "@/components/NewsletterSection";

export default function Song() {
  const [, params] = useRoute("/song/:id");
  const songId = params?.id;
  const [copied, setCopied] = useState(false);

  const songs: Record<string, any> = {
    "beijo-morte": {
      title: "O Beijo da Morte (30 Moedas)",
      collection: "A Trilogia de Jesus e Judas",
      part: "Parte 1",
      style: "Dark Rap Pesado",
      color: "from-red-900 to-red-700",
      lyrics: `(Intro: Batida pesada entra com som de moedas de prata caindo no chão de pedra. Clima sombrio, grave distorcido.)

(Verso 1)
Olha nos olhos, vê o reflexo da ambição
Três anos de estrada, comendo do mesmo pão
Caminhou lado a lado, viu o cego enxergar
Mas o brilho da prata fez o caráter cegar
Não foi um estranho, não foi um inimigo de fora
Foi quem tava na mesa, na ceia, na última hora
O tesoureiro do grupo, com a chave da confiança
Trocou a eternidade por uma falsa esperança
O plano foi traçado no porão da maldade
Vendeu a Luz do Mundo pela sua vaidade
Trinta moedas, o preço de um escravo qualquer
Pra entregar o Messias, o homem de Nazaré.

(Refrão - 2x)
É o peso da prata, o som da traição
Um beijo no rosto, o veneno na mão
Trair um amigo é o golpe mais sujo
No campo de sangue, não tem mais refúgio
Trinta moedas, o preço da dor
O beijo da morte no rosto do Amor.

(Verso 2)
O jardim tá escuro, o suor vira sangue
A angústia é pesada, o espírito não abrange
Lá vem a multidão, tochas acesas no breu
E na frente de todos, quem foi que apareceu?
"Salve, Mestre!", ele disse, com a voz de serpente
Usou o sinal do afeto pra ser o delinquente
Um beijo na face, o sinal combinado
Entregou o Inocente pra ser torturado
Jesus olhou no fundo, com o olhar de quem sabia:
"Amigo, a que vieste?", a dor que consumia
Não foi o cravo na mão que mais machucou
Foi o beijo do "irmão" que a alma perfurou.

(Ponte)
O remorso bateu quando o galo cantou
O brilho da prata logo se apagou
Jogou as moedas no chão do templo sagrado
Mas o sangue inocente já tava marcado
Não dá pra voltar, o nó já tá feito
O peso da culpa esmaga o peito
Um campo de sangue, um fim solitário
O nome de Judas: o eterno adversário.

(Outro)
(Som de moedas caindo... silêncio...)
Pesado, né?
Traição não tem cura.
O beijo que mata.
Trinta moedas...
(Batida desaparece aos poucos com um eco sombrio)`,
      audioPrompt: "Style: Dark Rap Pesado, Boom Bap, Clima tenso, Rimas cruas e diretas, Batida grave e marcante",
      videoPrompt: "Visual Style: Sombrio, Contraste entre luz e escuridão, Cenas do Getsêmani, Moedas brilhando, Beijo traidor em close"
    },
    "tetelestai": {
      title: "Tetelestai: O Grito da Vitória",
      collection: "A Trilogia de Jesus e Judas",
      part: "Parte 3",
      style: "Epic Trap Triunfante",
      color: "from-amber-900 to-orange-700",
      lyrics: `(Intro: A batida pesada volta, mas agora acompanhada por um coro épico e metais potentes. O som de trovão ecoa. O clima não é mais de derrota, mas de poder absoluto.)

(Verso 1: O Sacrifício Perfeito)
O céu se fechou, o meio-dia virou noite
O corpo marcado pelo cravo e pelo açoite
Mas não se engane, ninguém tirou Sua vida
Foi entrega voluntária, a missão cumprida
Cada gota de sangue que caiu naquele chão
Foi o preço do resgate, a nossa redenção
O inferno pensou que tinha vencido a guerra
Mas sentiu o tremor que abalou toda a terra
O véu do santuário rasgou de alto a baixo
Acabou a distância, o acesso eu agora acho
Não precisa de intermediário, nem de ritual
O Cordeiro de Deus venceu todo o mal.

(Refrão - 2x)
Tetelestai! O grito que ecoa na história
A dívida tá paga, receba a vitória
A morte perdeu, o túmulo tá vazio
O Leão rugiu, o inferno sentiu o calafrio.

(Verso 2: O Triunfo sobre a Morte)
Olha pro Calvário, vê o trono de madeira
Onde a Vida venceu a morte passageira
Onde o pecado foi pregado e ali morreu
Pra que eu pudesse viver o que Ele prometeu
A prata de Judas não pôde comprar
O que o sangue de Cristo veio nos dar
Liberdade real, quebra de toda corrente
O perdão que restaura o corpo e a mente
Três dias depois, o silêncio se quebrou
A pedra rolou, o Mestre ressuscitou!
Não procure entre os mortos Quem vivo está
Ele tem a chave da vida e sempre reinará.

(Ponte: A Autoridade Final)
Ele é o Alfa, o Ômega, o Senhor dos Senhores
O bálsamo santo que cura as nossas dores
Venceu a traição, venceu a zombaria
Transformou o luto em eterna alegria
O que era vergonha virou o nosso troféu
O caminho aberto da terra até o céu
Pode bater o bumbo, deixa o grave tremer
Pois o Rei da Glória tem todo o poder!

(Outro)
(A batida atinge o ápice com coros gloriosos)
Está Consumado.
A dívida foi paga.
Ele vive.
Ele reina.
Pra sempre. Amém.
(Som de um último e poderoso acorde de piano que sustenta até o fim.)`,
      audioPrompt: "Style: Epic Trap, Metais poderosos, Coros gloriosos, Transição da escuridão para luz, 808 épico",
      videoPrompt: "Visual Style: Epic Cinematic, Luz dourada quebrando escuridão, Véu do templo rasgando, Ressurreição, Leão de Judá, Montanha ao amanhecer"
    },
    "ponte-saudade": {
      title: "Ponte de Saudade (De Tóquio ao Brasil)",
      collection: "Histórias Pessoais",
      part: "Homenagem",
      style: "Balada Trap",
      color: "from-pink-600 to-rose-600",
      lyrics: `(Estilo: Balada emocionante, com melodia que cresce em intensidade, ideal para ser cantada com violão e piano.)

(Verso 1: A Luta no Brasil)
Lembro do tempo, a casa cheia, mas a mesa vazia
Três bocas pra alimentar, e a senhora, só a guia.
Pai ausente, mas a força de um exército em seu peito,
Vi a senhora guerrear, sem nunca pedir respeito.
As noites em claro, o trabalho, o pão que não podia faltar,
O amor que cobria a falta que o dinheiro não podia dar.
A senhora me ensinou que a fé não tem preço,
E que o maior tesouro é o amor que eu mereço.

(Pré-Refrão)
Mas a vida chamou, a porta da chance se abriu,
O nó na garganta, o adeus que o coração partiu.
Fui buscar o futuro, a chance que a gente não tinha,
Deixei a senhora lá, na sua luta sozinha.

(Refrão)
Agora o oceano nos separa, o fuso horário é cruel,
Eu aqui no Japão, e a senhora, meu céu, no Brasil.
E a cada notícia que chega, a angústia me consome,
De não poder te abraçar, de não poder chamar seu nome.
Mas saiba, Mãe, que esse amor atravessa o mar,
É a única ponte que o tempo não pode quebrar.
Obrigado por tudo, por cada falha que a senhora perdoou,
A senhora é a força que a minha vida moldou.

(Verso 2: A Distância e a Doença)
O carinho da senhora nunca diminuiu, eu sei,
Mesmo com a distância, a senhora sempre foi a minha lei.
Ligo o telefone, ouço a voz que me acalma,
Mas sinto o cansaço que pesa na sua alma.
Queria trocar de lugar, queria estar aí,
Pra cuidar da senhora, como a senhora cuidou de mim.
Essa dor de não poder, de estar longe, sem ter como voltar,
É o preço mais alto que a vida pode cobrar.

(Ponte)
Mas a senhora me ensinou que a oração tem poder,
Então eu fecho os olhos, e me transporto até você.
Lembro do seu colo, do cheiro do seu abraço,
E mando daqui a energia que cura, que vence o cansaço.
Não importa o que aconteça, a senhora é a minha raiz,
O meu maior presente, a razão de eu ser feliz.

(Refrão)
Agora o oceano nos separa, o fuso horário é cruel,
Eu aqui no Japão, e a senhora, meu céu, no Brasil.
E a cada notícia que chega, a angústia me consome,
De não poder te abraçar, de não poder chamar seu nome.
Mas saiba, Mãe, que esse amor atravessa o mar,
É a única ponte que o tempo não pode quebrar.
Obrigado por tudo, por cada falha que a senhora perdoou,
A senhora é a força que a minha vida moldou.

(Final)
(Música diminui, apenas o piano e a voz, quase um sussurro)
De Tóquio ao Brasil...
Obrigado, Mãe.
Eu te amo.
(Piano finaliza com um acorde suave e longo.)`,
      audioPrompt: "Style: Melodic Trap, Piano melancólico, 808 profundo, Atmosfera emocional, Vozes com reverb leve",
      videoPrompt: "Visual Style: Cinematográfico, Contraste entre Tóquio (neon, moderno) e Brasil (caloroso, familiar), Mãe em close, Oceano separando, Luz de esperança"
    }
  };

  const song = songs[songId || ""];

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Música não encontrada</h1>
          <Link href="/">
            <Button variant="outline">Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(song.lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className={`bg-gradient-to-r ${song.color} py-12`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-white/80 mb-2">{song.collection} • {song.part}</p>
          <h1 className="text-5xl font-bold text-white mb-2">{song.title}</h1>
          <p className="text-lg text-white/90">{song.style}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lyrics */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Letra Completa</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={copyToClipboard}
              className="text-slate-300 border-slate-600 hover:border-slate-500"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
          <div className="bg-slate-900/50 rounded p-6 overflow-auto max-h-96">
            <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {song.lyrics}
            </p>
          </div>
        </div>

        {/* Prompts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Audio Prompt */}
          <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-300 mb-4">Prompt de Áudio</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{song.audioPrompt}</p>
            <Button 
              variant="outline" 
              className="w-full text-purple-300 border-purple-700 hover:border-purple-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Usar no Suno/Udio
            </Button>
          </div>

          {/* Video Prompt */}
          <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Prompt de Vídeo</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{song.videoPrompt}</p>
            <Button 
              variant="outline" 
              className="w-full text-cyan-300 border-cyan-700 hover:border-cyan-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Usar no Runway/Pika
            </Button>
          </div>
        </div>

        {/* Music Player */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ouça Agora</h2>
          <MusicPlayer 
            title={song.title}
            artist="LÚMEN"
          />
        </div>

        {/* Share */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-3">Compartilhe Esta Música</h3>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="text-slate-300 border-slate-600">
              Copiar Link
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Compartilhar
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Criado com ❤️ por Manus AI | Portfólio Musical © 2026</p>
        </div>
      </footer>
    </div>
  );
}
