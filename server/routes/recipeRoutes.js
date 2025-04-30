const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middleware/upload');

router.get('/', recipeController.getAllRecipes);

router.get('/:id', recipeController.getRecipeById);

router.post('/', upload.single('image'), recipeController.createRecipe);

router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
