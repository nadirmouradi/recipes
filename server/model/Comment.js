const db = require('../config/database');

const Comment = {
  // Récupère tous les commentaires pour une recette avec les infos utilisateur
  getAllForRecipe: async (recipeId) => {
    try {
      const [results] = await db.query(
        `SELECT comments.*, users.nom, users.prenom 
         FROM comments 
         JOIN users ON comments.user_id = users.id 
         WHERE comments.recipe_id = ?
         ORDER BY comments.created_at DESC`,
        [recipeId]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },

  create: async (data) => {
    const { user_id, recipe_id, contenu } = data;
    try {
      const [result] = await db.query(
        `INSERT INTO comments (user_id, recipe_id, contenu)
         VALUES (?, ?, ?)`,
        [user_id, recipe_id, contenu]
      );
      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.query(
        `DELETE FROM comments WHERE id = ?`,
        [id]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Comment;