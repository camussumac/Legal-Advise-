import React from 'react';
import { Scale } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Legal Document Analysis
          </h1>
        </div>
      </div>
    </header>
  );
}