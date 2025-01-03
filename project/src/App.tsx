import React from 'react';
import { DocumentUpload } from './components/DocumentUpload';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DocumentUpload />
      </main>
    </div>
  );
}

export default App;