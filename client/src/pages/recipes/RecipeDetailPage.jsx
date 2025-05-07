import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../api/recipes';
import CommentSection from '../../components/recipes/CommentSection';
import { ClockIcon, CakeIcon, FireIcon } from '@heroicons/react/24/outline';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setError(null);
      } catch (error) {
        setError("Erreur lors du chargement de la recette");
        console.error('Erreur :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center p-10">Recette non trouvée</div>;
  }

  const getDifficultyColor = (difficulte) => {
    switch(difficulte) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'salée': return 'bg-blue-100 text-blue-800';
      case 'sucrée': return 'bg-pink-100 text-pink-800';
      case 'boisson': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={`http://localhost:8080${recipe.image_url}`}
          alt={recipe.titre}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-recipe.jpg';
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white">{recipe.titre}</h1>
              <div className="flex items-center mt-2">
                <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mr-2">
                  <span className="text-xs">
                    {recipe.prenom?.charAt(0)}{recipe.nom?.charAt(0)}
                  </span>
                </div>
                <span className="text-white/90">
                  {recipe.prenom} {recipe.nom}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(recipe.type)}`}>
                {recipe.type}
              </span>
              <div className="bg-white/90 px-3 py-1 rounded-full flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  ⭐ {recipe.rating || '4.5'} • {recipe.views || '1.6K'} 👁️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Préparation</h2>
            <div className="prose max-w-none text-gray-700">
              {recipe.preparation.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          <CommentSection recipeId={id} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Ingrédients</h2>
            <ul className="space-y-2">
              {recipe.ingredients?.split(',').map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{item.trim()}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t">
              <div className="space-y-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Temps de préparation</h3>
                    <p className="text-gray-900 font-medium">{recipe.temps_preparation || 'Non spécifié'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FireIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Difficulté</h3>
                    <p className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getDifficultyColor(recipe.difficulte)}`}>
                      {recipe.difficulte || 'Non spécifiée'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CakeIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getTypeColor(recipe.type)}`}>
                      {recipe.type || 'Non spécifié'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;