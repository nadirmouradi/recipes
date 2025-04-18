const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Ajouter une recette aux favoris
router.post('/', favoriteController.addFavorite);

// Supprimer une recette des favoris
router.delete('/:id', favoriteController.removeFavorite);

// Obtenir toutes les recettes favorites d'un utilisateur
router.get('/:userId', favoriteController.getUserFavorites);

module.exports = router;
