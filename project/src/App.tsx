import React from 'react';
import PDFUpload from './components/PDFUpload';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Legal Document Analysis</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4 text-center">Upload a legal document to analyze</p>
        <PDFUpload />
      </div>
    </div>
  );
}

export default App;