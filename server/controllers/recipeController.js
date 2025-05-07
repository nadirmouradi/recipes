const Recipe = require('../model/Recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAll(); 
    res.json(recipes); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des recettes' });
  }
};

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


exports.createRecipe = async (req, res) => {
  const { user_id, titre, description, preparation, ingredients,temps_preparation,type,difficulte } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newRecipe = await Recipe.create({ user_id, titre, description, image_url, preparation, ingredients,temps_preparation,type,difficulte });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de la recette' });
  }
};



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
