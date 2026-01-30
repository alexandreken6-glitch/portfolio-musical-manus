import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import FileUploadZone from "@/components/FileUploadZone";
import { Music, Video, Image, File, Trash2, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FileManager() {
  const { user, isAuthenticated } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: files, isLoading, refetch } = trpc.files.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      toast.success("Arquivo enviado com sucesso!");
      setSelectedFile(null);
      refetch();
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error("Erro ao enviar arquivo: " + error.message);
      setIsUploading(false);
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      toast.success("Arquivo deletado!");
      refetch();
    },
    onError: () => {
      toast.error("Erro ao deletar arquivo");
    },
  });

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      const fileType = selectedFile.type.startsWith("audio/")
        ? "audio"
        : selectedFile.type.startsWith("video/")
          ? "video"
          : selectedFile.type.startsWith("image/")
            ? "image"
            : "document";

      uploadMutation.mutate({
        fileName: selectedFile.name,
        fileData: base64,
        mimeType: selectedFile.type,
        fileType: fileType as any,
      });
    };

    reader.readAsDataURL(selectedFile);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("audio/")) {
      return <Music className="w-5 h-5 text-purple-400" />;
    }
    if (mimeType.startsWith("video/")) {
      return <Video className="w-5 h-5 text-blue-400" />;
    }
    if (mimeType.startsWith("image/")) {
      return <Image className="w-5 h-5 text-green-400" />;
    }
    return <File className="w-5 h-5 text-slate-400" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Faça login para gerenciar arquivos
          </h1>
          <p className="text-slate-400">
            Você precisa estar autenticado para acessar o gerenciador de arquivos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Gerenciador de Arquivos</h1>
          <p className="text-slate-400">
            Faça upload de áudios, vídeos, imagens e documentos para seu portfólio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Zone */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4">Novo Upload</h2>
              <FileUploadZone onFileSelect={handleFileSelect} />

              {selectedFile && (
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Arquivo"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Files List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4">
                Meus Arquivos ({files?.length || 0})
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : files && files.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(file.mimeType)}
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium truncate">
                            {file.fileName}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {formatFileSize(file.fileSize)} • {file.fileType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-slate-400" />
                        </a>
                        <button
                          onClick={() => deleteMutation.mutate({ fileId: file.id })}
                          disabled={deleteMutation.isPending}
                          className="p-2 hover:bg-red-900/50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <File className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Nenhum arquivo enviado ainda</p>
                  <p className="text-slate-500 text-sm">
                    Comece fazendo upload de seus arquivos
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-2">Sobre o Armazenamento</h3>
          <p className="text-slate-300 text-sm">
            Seus arquivos são armazenados de forma segura em S3. Você pode fazer download,
            compartilhar links ou deletar arquivos a qualquer momento. Máximo de 100MB por arquivo.
          </p>
        </div>
      </div>
    </div>
  );
}
