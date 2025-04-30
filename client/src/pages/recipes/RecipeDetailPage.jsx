import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../api/recipes';
import CommentSection from '../../components/recipes/CommentSection';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

 useEffect(() => {
     const fetchRecipes = async () => {
       try {
         const data = await getRecipeById(id);
         setRecipe(data);
       } catch (error) {
         console.error('Erreur :', error);
       } 
     };
     fetchRecipes();
   }, []);
   console.log(recipe)
  if (!recipe) return <div className="text-center p-10">Chargement...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/2">
          <img
            src={`http://localhost:8080${recipe.image_url}`}
            alt={recipe.titre}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.titre}</h1>
          <p className="text-gray-600 mb-4"><span className="font-semibold">Par :</span> {recipe.nom} {recipe.prenom}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 mb-4">{recipe.description}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingrédients</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {recipe.ingredients?.split(',').map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Préparation</h2>
          <p className="text-gray-700 whitespace-pre-line">{recipe.preparation}</p>
        </div>
      </div>

      <CommentSection recipeId={id} />
    </div>
  );
}

export default RecipeDetailPage;
