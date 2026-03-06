import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  title: string;
  artist?: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
}

export default function MusicPlayer({
  title,
  artist = "LÚMEN",
  spotifyUrl,
  soundcloudUrl,
  youtubeUrl,
}: MusicPlayerProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
          <Music className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{artist}</p>
        </div>
      </div>

      <div className="space-y-3">
        {spotifyUrl && (
          <div className="rounded-lg overflow-hidden bg-black">
            <iframe
              src={`https://open.spotify.com/embed/track/${extractSpotifyId(spotifyUrl)}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full"
            />
          </div>
        )}

        {youtubeUrl && (
          <div className="rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${extractYoutubeId(youtubeUrl)}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        )}

        {soundcloudUrl && (
          <a
            href={soundcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full gap-2 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10"
            >
              <Play className="w-4 h-4" />
              Ouvir no SoundCloud
            </Button>
          </a>
        )}

        {!spotifyUrl && !youtubeUrl && !soundcloudUrl && (
          <p className="text-sm text-slate-400 text-center py-4">
            Em breve em todas as plataformas de streaming
          </p>
        )}
      </div>
    </div>
  );
}

function extractSpotifyId(url: string): string {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}

function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  return match ? match[1] : "";
}
