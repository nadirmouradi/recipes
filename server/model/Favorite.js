const db = require('../config/database');

const Favorite = {
  exists: (userId, recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?',
        [userId, recipeId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0); 
        }
      );
    });
  },

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

  remove: (favoriteId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM favorites WHERE id = ?', [favoriteId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

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
