import React, { useState, useRef } from 'react';

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {!file ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="text-gray-600">
            <p className="text-lg mb-2">Drop your PDF here</p>
            <p className="text-sm mb-4">or</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Select File
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded">
            <span className="font-medium truncate">{file.name}</span>
            <button
              onClick={clearFile}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
          {preview && (
            <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px]">
              <iframe
                src={preview}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}