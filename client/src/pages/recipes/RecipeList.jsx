import { useEffect, useState } from 'react';
import RecipeCard from '../../components/recipes/RecipeCard';
import { useRecipes } from '../../context/RecipesContext';

const RecipeList = ({searchQuery}) => {

  
  const { recipes, loading, error } = useRecipes();
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  
  if (error) {
    return <div>Erreur: {error}</div>;
  }
  console.log(recipes)
  const filteredRecipes = recipes.filter(recipe =>
    recipe.titre.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {filteredRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
