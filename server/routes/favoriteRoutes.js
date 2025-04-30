const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.post('/', favoriteController.addFavorite);

router.delete('/:id', favoriteController.removeFavorite);

router.get('/:userId', favoriteController.getUserFavorites);

module.exports = router;
