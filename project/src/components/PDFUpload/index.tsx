import React, { useState, useRef } from 'react';

interface PDFUploadProps {
  onUpload?: (file: File) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onUpload }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      onUpload?.(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      onUpload?.(file);
    } else {
      alert('Please drop a PDF file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearFile = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {!pdfUrl ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="text-gray-600">
            <p className="mb-2">Drag and drop your PDF here</p>
            <p className="text-sm">or</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Choose File
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <span className="truncate max-w-xs">{fileName}</span>
            <button
              onClick={clearFile}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
          <div className="w-full h-96 border border-gray-300 rounded">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUpload;