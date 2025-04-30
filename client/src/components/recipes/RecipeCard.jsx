import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        src={`http://localhost:8080${recipe.image_url}`}
        alt={recipe.titre}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.titre}
        </h3>

        <p className="text-gray-600 mb-4">
          {recipe.nom} {recipe.prenom}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
