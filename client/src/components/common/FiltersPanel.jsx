import { XMarkIcon } from '@heroicons/react/24/outline';


const filterGroups = [
  {
    name: 'Type',
    filters: [
      { id: 'boisson', label: 'boisson' },
      { id: 'sucrée', label: 'sucrée' },
      { id: 'salée', label: 'salée' }
    ]
  },
  {
    name: 'Temps',
    filters: [
      { id: '< 30 min', label: '< 30 min' },
      { id: '30-60 min', label: '30-60 min' },
      { id: '> 60 min', label: '> 60 min' }
    ]
  },
  {
    name: 'Difficulté',
    filters: [
      { id: 'facile', label: 'Facile' },
      { id: 'moyen', label: 'Moyen' },
      { id: 'difficile', label: 'Difficile' }
    ]
  }
];

const FiltersPanel = ({activeFilters , setActiveFilters}) => {

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
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
      </div>
    </div>
  );
};

export default FiltersPanel;
