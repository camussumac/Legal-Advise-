import type { LegalUpdate } from '../types/legalUpdates';

const legalUpdatesDb: LegalUpdate[] = [
  {
    id: '1',
    category: 'arbeitsrecht',
    stateId: 'JAL',
    title: 'Cambios en la Ley del Trabajo de Jalisco',
    description: 'Nuevas regulaciones sobre contratos temporales.',
    date: new Date('2024-01-15'),
    source: 'Secretaría del Trabajo de Jalisco'
  },
  // ... previous updates ...
];

export function getLegalUpdates(categories: string[], states: string[]): LegalUpdate[] {
  if (categories.length === 0 && states.length === 0) return [];
  return legalUpdatesDb
    .filter(update => 
      (categories.length === 0 || categories.includes(update.category)) &&
      (states.length === 0 || states.includes(update.stateId))
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}