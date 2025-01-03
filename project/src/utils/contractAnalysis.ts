import type { ContractAnalysis } from '../types';
import { mexicanStates } from '../constants/mexicanStates';

export async function analyzeContract(
  content: string, 
  lawCategories: string[],
  states: string[]
): Promise<ContractAnalysis> {
  // Simulate API call to AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        riskScore: Math.floor(Math.random() * 100),
        missingClauses: [
          'Cláusula de protección de datos según LFPDPPP',
          'Período de preaviso',
          'Jurisdicción'
        ],
        contradictions: [
          {
            description: 'Condiciones de pago contradictorias en §3 y §7',
            location: 'Página 2, Párrafo 3'
          }
        ],
        suggestions: [
          'Se recomienda una formulación más precisa de la cláusula de responsabilidad',
          'Agregar cláusula salvaguarda'
        ],
        stateSpecificIssues: states.map(stateId => ({
          stateId,
          issues: [
            `Requisito específico para ${mexicanStates.find(s => s.id === stateId)?.name}`,
            'Consideraciones locales adicionales necesarias'
          ]
        }))
      });
    }, 1500);
  });
}