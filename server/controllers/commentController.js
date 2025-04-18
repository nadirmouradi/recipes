// controllers/commentController.js

const Comment = require('../model/Comment');

// Récupérer tous les commentaires d'une recette
exports.getAllCommentsForRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const comments = await Comment.getAllForRecipe(recipeId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires' });
  }
};

// Ajouter un commentaire à une recette
exports.addComment = async (req, res) => {
  const { user_id, recipe_id, contenu } = req.body;

  try {
    const newComment = await Comment.create({ user_id, recipe_id, contenu });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    await Comment.delete(commentId);
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire' });
  }
};
