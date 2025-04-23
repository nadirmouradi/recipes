const Recipe = require('../model/Recipe');

// Obtenir toutes les recettes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAll(); // Appelle la fonction getAll du modèle
    res.json(recipes); // Renvoie les recettes au frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des recettes' });
  }
};

// Obtenir une recette par son ID
exports.getRecipeById = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.getById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la recette' });
  }
};

// Créer une nouvelle recette
// controllers/recipeController.js
exports.createRecipe = async (req, res) => {
  const { user_id, titre, description, preparation, ingredients } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newRecipe = await Recipe.create({ user_id, titre, description, image_url, preparation, ingredients });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de la recette' });
  }
};



// Supprimer une recette
exports.deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    await Recipe.delete(recipeId);
    res.json({ message: 'Recette supprimée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
  }
};
