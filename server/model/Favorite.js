const db = require('../config/database');

const Favorite = {
  // Vérifier si la recette est déjà dans les favoris
  exists: (userId, recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?',
        [userId, recipeId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0); // Si une ligne est retournée, la recette est déjà dans les favoris
        }
      );
    });
  },

  // Ajouter une recette aux favoris
  add: (userId, recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)',
        [userId, recipeId],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, user_id: userId, recipe_id: recipeId });
        }
      );
    });
  },

  // Supprimer une recette des favoris
  remove: (favoriteId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM favorites WHERE id = ?', [favoriteId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Obtenir les favoris d'un utilisateur
  getByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT recipes.* FROM favorites JOIN recipes ON favorites.recipe_id = recipes.id WHERE favorites.user_id = ?',
        [userId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
};

module.exports = Favorite;
