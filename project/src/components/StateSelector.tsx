import React from 'react';
import { MapPin } from 'lucide-react';
import { mexicanStates } from '../constants/mexicanStates';

interface Props {
  selectedStates: string[];
  onStateChange: (states: string[]) => void;
}

export function StateSelector({ selectedStates, onStateChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-medium">Estados</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {mexicanStates.map(state => (
          <button
            key={state.id}
            onClick={() => {
              const newStates = selectedStates.includes(state.id)
                ? selectedStates.filter(s => s !== state.id)
                : [...selectedStates, state.id];
              onStateChange(newStates);
            }}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors text-left
              ${selectedStates.includes(state.id)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {state.name}
          </button>
        ))}
      </div>
    </div>
  );
}