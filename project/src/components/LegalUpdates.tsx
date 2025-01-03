import React from 'react';
import { BookOpen } from 'lucide-react';
import type { LegalUpdate } from '../types/legalUpdates';

interface Props {
  updates: LegalUpdate[];
}

export function LegalUpdates({ updates }: Props) {
  if (updates.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-medium">Cambios Legales Recientes</h3>
      </div>
      <div className="space-y-4">
        {updates.map(update => (
          <div key={update.id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">{update.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{update.description}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span>{update.date.toLocaleDateString('es-MX')}</span>
              <span className="mx-2">•</span>
              <span>{update.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}