// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

// Récupérer tous les commentaires d'une recette
router.get('/:recipeId', CommentController.getAllCommentsForRecipe);

// Ajouter un commentaire à une recette
router.post('/', CommentController.addComment);

// Supprimer un commentaire
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
