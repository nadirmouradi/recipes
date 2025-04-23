// src/components/Navbar/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import  FiltersPanel  from './FiltersPanel';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                RECETTE
              </Link>
            </div>

            {/* Barre de recherche */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des recettes..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Actions droite */}
            <div className="flex items-center space-x-4*">
              <Link
                to="/new-recipe"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Ajouter une recette
              </Link>
            </div>
            <div className=" relative flex-shrink-0">
              <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                  U
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Panel de Filtres - Toujours visible */}
      <FiltersPanel 
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
      />
    </>
  );
}
export default Navbar