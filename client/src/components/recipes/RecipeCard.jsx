import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Image avec badge en superposition */}
      <div className="relative">
        <img
          src={`http://localhost:8080${recipe.image_url}`}
          alt={recipe.titre}
          className="h-48 w-full object-cover"
        />
        
      </div>

      {/* Contenu texte avec disposition en colonne */}
      <div className="p-4">
        {/* Ligne supérieure avec titre et stats */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1">
            {recipe.titre}
          </h3>
          
        </div>

        {/* Auteur avec avatar */}
        <div className="flex items-center mb-3">
          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
            <span className="text-xs text-gray-600">
              {recipe.nom?.charAt(0)}{recipe.prenom?.charAt(0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {recipe.prenom} {recipe.nom}
          </p>
        </div>

        {/* Tags/Métadonnées */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {recipe.type}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {recipe.difficulte}
          </span>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            {recipe.temps_preparation}
          </span>
        </div>

        {/* Bouton d'action */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voir la recette
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;