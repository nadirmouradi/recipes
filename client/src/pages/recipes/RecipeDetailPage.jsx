import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../api/recipes';
import axios from 'axios';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);

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
      {/* Section principale */}
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={`http://localhost:8080${recipe.image_url}`}
            alt={recipe.titre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Infos recette */}
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

      {/* Commentaires */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Commentaires</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">Aucun commentaire pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-gray-800 font-semibold">{comment.nom}</p>
                <p className="text-gray-600">{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailPage;
