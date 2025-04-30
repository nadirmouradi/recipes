
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/:recipeId', CommentController.getAllCommentsForRecipe);

router.post('/', CommentController.addComment);

router.delete('/:id', CommentController.deleteComment);

module.exports = router;
