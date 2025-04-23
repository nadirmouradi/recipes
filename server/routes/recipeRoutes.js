const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middleware/upload');

// 🔸 Route : Obtenir toutes les recettes
router.get('/', recipeController.getAllRecipes);

// 🔸 Route : Obtenir une recette spécifique par ID
router.get('/:id', recipeController.getRecipeById);

// 🔸 Route : Créer une nouvelle recette
router.post('/', upload.single('image'), recipeController.createRecipe);

// 🔸 Route : Supprimer une recette
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
