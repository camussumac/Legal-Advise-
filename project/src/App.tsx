import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { Auth } from './components/Auth';
import { UploadArea } from './components/UploadArea';
import { TextAnalysis } from './components/TextAnalysis';
import { AnalysisResult } from './components/AnalysisResult';
import { LawCategoryFilter } from './components/LawCategoryFilter';
import { LegalUpdates } from './components/LegalUpdates';
import { StateSelector } from './components/StateSelector';
import { supabase } from './utils/supabase';
import type { Contract } from './types';

export default function App() {
  const [session, setSession] = useState(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Análisis de Contratos IA
              </h1>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Rest of your existing App component code */}
    </div>
  );
}