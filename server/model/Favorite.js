const db = require('../config/database');

const Favorite = {
  // Vérifie si un favori existe déjà
  exists: async (userId, recipeId) => {
    try {
      const [results] = await db.query(
        'SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?',
        [userId, recipeId]
      );
      return results.length > 0;
    } catch (err) {
      throw err;
    }
  },

  // Ajoute un nouveau favori
  add: async (userId, recipeId) => {
    try {
      const [result] = await db.query(
        'INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)',
        [userId, recipeId]
      );
      return { id: result.insertId, user_id: userId, recipe_id: recipeId };
    } catch (err) {
      throw err;
    }
  },

  // Supprime un favori
  remove: async (favoriteId) => {
    try {
      const [result] = await db.query(
        'DELETE FROM favorites WHERE id = ?', 
        [favoriteId]
      );
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Récupère tous les favoris d'un utilisateur
  getByUserId: async (userId) => {
    try {
      const [results] = await db.query(
        `SELECT recipes.* 
         FROM favorites 
         JOIN recipes ON favorites.recipe_id = recipes.id 
         WHERE favorites.user_id = ?`,
        [userId]
      );
      return results;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Favorite;