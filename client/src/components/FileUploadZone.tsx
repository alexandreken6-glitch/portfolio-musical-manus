import { Upload, X, File, Music, Video, Image } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  label?: string;
}

export default function FileUploadZone({
  onFileSelect,
  acceptedTypes = ["audio/*", "video/*", "image/*", ".pdf", ".doc", ".docx"],
  maxSize = 100, // 100MB default
  label = "Arraste arquivos aqui ou clique para selecionar",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`Arquivo muito grande. Máximo: ${maxSize}MB`);
      return false;
    }

    // Check file type
    const fileType = file.type;
    const fileName = file.name;
    const isAccepted = acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return fileType.startsWith(type.replace("/*", ""));
      }
      return fileName.endsWith(type);
    });

    if (!isAccepted) {
      toast.error("Tipo de arquivo não suportado");
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("audio/")) {
      return <Music className="w-8 h-8 text-purple-400" />;
    }
    if (file.type.startsWith("video/")) {
      return <Video className="w-8 h-8 text-blue-400" />;
    }
    if (file.type.startsWith("image/")) {
      return <Image className="w-8 h-8 text-green-400" />;
    }
    return <File className="w-8 h-8 text-slate-400" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-slate-600 bg-slate-900/50 hover:border-slate-500"
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-300 mb-2 font-medium">{label}</p>
          <p className="text-slate-500 text-sm mb-4">
            Máximo: {maxSize}MB
          </p>
          <label>
            <input
              type="file"
              onChange={handleFileInput}
              accept={acceptedTypes.join(",")}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={(e) => {
                e.currentTarget.parentElement?.querySelector("input")?.click();
              }}
            >
              Selecionar Arquivo
            </Button>
          </label>
        </div>
      ) : (
        <div className="border border-slate-700 rounded-lg p-6 bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getFileIcon(selectedFile)}
              <div className="text-left">
                <p className="text-white font-medium truncate max-w-xs">
                  {selectedFile.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title="Remover arquivo"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full animate-pulse" />
              </div>
              <p className="text-slate-400 text-sm mt-2">Enviando...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
