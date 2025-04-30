import { XMarkIcon } from '@heroicons/react/24/outline';

const filterGroups = [
  {
    name: 'Type',
    filters: [
      { id: 'vegetarian', label: 'Végétarien' },
      { id: 'vegan', label: 'Végan' },
      { id: 'meat', label: 'Viande' }
    ]
  },
  {
    name: 'Temps',
    filters: [
      { id: 'quick', label: '< 30 min' },
      { id: 'medium', label: '30-60 min' },
      { id: 'long', label: '> 60 min' }
    ]
  },
  {
    name: 'Difficulté',
    filters: [
      { id: 'easy', label: 'Facile' },
      { id: 'medium', label: 'Moyen' },
      { id: 'hard', label: 'Difficile' }
    ]
  }
];

const FiltersPanel = ({ activeFilters, onFilterChange }) => {
  const toggleFilter = (filterId) => {
    onFilterChange(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="bg-gray-50 border-b shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-6">
          {filterGroups.map((group) => (
            <div key={group.name} className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilters.includes(filter.id)
                        ? 'bg-blue-600 text-white border border-blue-700'
                        : 'bg-white text-gray-800 border border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {activeFilters.map((filterId) => {
                const filter = filterGroups
                  .flatMap(g => g.filters)
                  .find(f => f.id === filterId);
                return (
                  <span 
                    key={filterId}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {filter?.label}
                    <button 
                      onClick={() => toggleFilter(filterId)}
                      className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
              <button 
                onClick={() => onFilterChange([])}
                className="ml-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Tout effacer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default FiltersPanel