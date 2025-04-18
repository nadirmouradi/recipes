const Favorite = require('../model/Favorite');

// Ajouter une recette aux favoris
exports.addFavorite = async (req, res) => {
  const { user_id, recipe_id } = req.body;

  try {
    // Vérifier si la recette est déjà dans les favoris
    const favoriteExists = await Favorite.exists(user_id, recipe_id);
    if (favoriteExists) {
      return res.status(400).json({ message: 'Recette déjà dans les favoris' });
    }

    // Ajouter la recette aux favoris
    const newFavorite = await Favorite.add(user_id, recipe_id);
    res.status(201).json(newFavorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout aux favoris' });
  }
};

// Supprimer une recette des favoris
exports.removeFavorite = async (req, res) => {
  const favoriteId = req.params.id;

  try {
    await Favorite.remove(favoriteId);
    res.json({ message: 'Recette supprimée des favoris' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression des favoris' });
  }
};

// Obtenir toutes les recettes favorites d'un utilisateur
exports.getUserFavorites = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favorites = await Favorite.getByUserId(userId);
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
  }
};
