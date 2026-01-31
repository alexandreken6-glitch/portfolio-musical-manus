import { Music } from "lucide-react";

interface AudioPlayerProps {
  spotifyUrl?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  title: string;
}

export default function AudioPlayer({
  spotifyUrl,
  youtubeUrl,
  audioUrl,
  title,
}: AudioPlayerProps) {
  return (
    <div className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Ouça Agora</h3>
      </div>

      <div className="space-y-4">
        {spotifyUrl && (
          <div className="rounded-lg overflow-hidden">
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/track/${spotifyUrl.split("/").pop()}?utm_source=generator`}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        )}

        {youtubeUrl && (
          <div className="rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="315"
              src={youtubeUrl.replace("watch?v=", "embed/")}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        )}

        {audioUrl && !spotifyUrl && !youtubeUrl && (
          <div className="bg-slate-900/50 rounded-lg p-4">
            <audio
              controls
              className="w-full"
              src={audioUrl}
              controlsList="nodownload"
            >
              Seu navegador não suporta o elemento de áudio.
            </audio>
            <p className="text-slate-400 text-sm mt-2">
              Clique em "Download" para salvar a música
            </p>
          </div>
        )}

        {!spotifyUrl && !youtubeUrl && !audioUrl && (
          <div className="bg-slate-900/50 rounded-lg p-6 text-center">
            <Music className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">
              Player indisponível para esta música
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
