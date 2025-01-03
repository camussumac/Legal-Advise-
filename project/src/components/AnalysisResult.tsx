import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { ContractAnalysis } from '../types';

interface Props {
  analysis: ContractAnalysis;
}

export function AnalysisResult({ analysis }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Nivel de Riesgo</h3>
        <div className="flex items-center">
          <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${analysis.riskScore < 30 ? 'bg-green-500' : analysis.riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${analysis.riskScore}%` }}
            />
          </div>
          <span className="ml-3 font-medium">{analysis.riskScore}%</span>
        </div>
      </div>

      {analysis.missingClauses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-500" />
            Cláusulas Faltantes
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.missingClauses.map((clause, index) => (
              <li key={index} className="text-gray-700">{clause}</li>
            ))}
          </ul>
        </div>
      )}

      {analysis.contradictions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <XCircle className="mr-2 text-red-500" />
            Contradicciones
          </h3>
          {analysis.contradictions.map((contradiction, index) => (
            <div key={index} className="mb-3">
              <p className="text-gray-700">{contradiction.description}</p>
              <p className="text-sm text-gray-500">Ubicación: {contradiction.location}</p>
            </div>
          ))}
        </div>
      )}

      {analysis.suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <CheckCircle className="mr-2 text-green-500" />
            Sugerencias de Mejora
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}