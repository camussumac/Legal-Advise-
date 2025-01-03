import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface Props {
  onAnalyze: (text: string) => void;
}

export function TextAnalysis({ onAnalyze }: Props) {
  const [text, setText] = useState('');

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-medium">Análisis de Texto</h3>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pegue aquí el texto de su contrato..."
        className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={() => onAnalyze(text)}
        disabled={!text.trim()}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Analizar Texto
      </button>
    </div>
  );
}