import { ExternalLink, Instagram, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialMediaSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Siga Lúmen</h2>
          <p className="text-lg text-muted-foreground">
            Acompanhe os últimos lançamentos, teasers e conteúdo exclusivo nas redes sociais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Instagram Card */}
          <div className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instagram</h3>
                  <p className="text-sm text-muted-foreground">@lumen.trap</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                Reels, stories e conteúdo exclusivo. Acompanhe o dia a dia da criação musical e lançamentos.
              </p>

              <a
                href="https://instagram.com/lumen.trap"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  Seguir no Instagram
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>

              {/* Instagram Embed */}
              <div className="mt-6 rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.instagram.com/lumen.trap/embed"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* TikTok Card */}
          <div className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">TikTok</h3>
                  <p className="text-sm text-muted-foreground">@lumen.trap_</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                Vídeos curtos, teasers de músicas e conteúdo viral. Trap melódico em movimento.
              </p>

              <a
                href="https://www.tiktok.com/@lumen.trap_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Seguir no TikTok
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>

              {/* TikTok Embed */}
              <div className="mt-6 rounded-lg overflow-hidden border border-border bg-black">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <p className="text-white text-sm text-center px-4">
                    <a
                      href="https://www.tiktok.com/@lumen.trap_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      Visite nosso TikTok para ver vídeos em movimento
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Não perca nenhuma atualização. Siga nas redes sociais e ative as notificações!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://instagram.com/lumen.trap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Instagram
              </Button>
            </a>
            <a
              href="https://www.tiktok.com/@lumen.trap_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                TikTok
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
