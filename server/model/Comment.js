
const db = require('../config/database');

const Comment = {
  getAllForRecipe: (recipeId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT comments.*, users.nom, users.prenom 
         FROM comments 
         JOIN users ON comments.user_id = users.id 
         WHERE comments.recipe_id = ?
         ORDER BY comments.created_at DESC`,
        [recipeId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  create: (data) => {
    const { user_id, recipe_id, contenu } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO comments (user_id, recipe_id, contenu)
         VALUES (?, ?, ?)`,
        [user_id, recipe_id, contenu],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, ...data });
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM comments WHERE id = ?`, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Comment;
