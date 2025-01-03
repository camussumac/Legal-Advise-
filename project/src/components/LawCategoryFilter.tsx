import React from 'react';
import { Tag } from 'lucide-react';
import { translations } from '../constants/translations';

interface Props {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function LawCategoryFilter({ selectedCategories, onCategoryChange }: Props) {
  const categories = [
    { id: 'arbeitsrecht', label: translations.categories.arbeitsrecht },
    { id: 'handelsrecht', label: translations.categories.handelsrecht },
    { id: 'mietrecht', label: translations.categories.mietrecht },
    { id: 'datenschutz', label: translations.categories.datenschutz },
    { id: 'vertragsrecht', label: translations.categories.vertragsrecht }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Tag className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-medium">Áreas Legales</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              const newCategories = selectedCategories.includes(category.id)
                ? selectedCategories.filter(c => c !== category.id)
                : [...selectedCategories, category.id];
              onCategoryChange(newCategories);
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedCategories.includes(category.id)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}