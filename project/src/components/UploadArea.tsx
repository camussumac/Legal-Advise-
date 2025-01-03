import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { readPdfContent } from '../utils/fileHandling';

interface Props {
  onUpload: (content: string) => void;
}

export function UploadArea({ onUpload }: Props) {
  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Por favor, suba únicamente archivos PDF.');
      return;
    }
    const content = await readPdfContent(file);
    onUpload(content);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">Subir Contrato</h3>
      <p className="mt-2 text-sm text-gray-500">
        Arrastre un archivo PDF aquí o haga clic para seleccionar
      </p>
      <input
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}