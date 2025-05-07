import { useEffect, useState } from 'react';
import RecipeCard from '../../components/recipes/RecipeCard';
import { useRecipes } from '../../context/RecipesContext';

const RecipeList = ({ searchQuery, activeFilters }) => {
  const { recipes, loading, error } = useRecipes();

  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.titre.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter =>
      [recipe.type, recipe.temps_preparation, recipe.difficulte].includes(filter)
    );
  
    return matchesSearch && matchesFilters;
  });
  
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">Aucune recette ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;