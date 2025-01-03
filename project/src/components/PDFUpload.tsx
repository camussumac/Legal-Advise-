import React, { useState } from 'react';

interface PDFFile {
  name: string;
  url: string;
  size: number;
}

export const PDFUpload: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPdfs: PDFFile[] = [];
    setError('');

    Array.from(files).forEach((file) => {
      if (file.type !== 'application/pdf') {
        setError('Please upload only PDF files');
        return;
      }

      // Create a URL for the file
      const url = URL.createObjectURL(file);
      newPdfs.push({
        name: file.name,
        url: url,
        size: file.size,
      });
    });

    setPdfs([...pdfs, ...newPdfs]);
  };

  const removeFile = (index: number) => {
    const newPdfs = [...pdfs];
    URL.revokeObjectURL(newPdfs[index].url); // Clean up the URL
    newPdfs.splice(index, 1);
    setPdfs(newPdfs);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload PDF Files
        </label>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {pdfs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Files:</h3>
          <div className="space-y-3">
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded"
              >
                <div>
                  <p className="font-medium">{pdf.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(pdf.size)}</p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </a>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
